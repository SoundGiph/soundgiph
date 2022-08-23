import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { PassportStrategy } from "@nestjs/passport";
import { Request } from "express";
import * as ApplePassportStrategy from "passport-apple";
import * as path from "path";

@Injectable()
export class AppleStrategy extends PassportStrategy(ApplePassportStrategy, "apple") {
  constructor(jwtService: JwtService) {
    super(
      {
        clientID: process.env.APPLE_CLIENT_ID,
        teamID: process.env.APPLE_TEAM_ID,
        callbackURL: process.env.APPLE_CALLBACK_URL,
        keyID: process.env.APPLE_KEY_ID,
        privateKeyLocation: path.join(__dirname, `/secrets/AuthKey_${process.env.APPLE_KEY_ID}.p8`),
        passReqToCallback: false,
      },
      async (
        _accessToken: string,
        _refreshToken: string,
        idToken: string,
        _profile: Record<string, never>,
        verified: ApplePassportStrategy.VerifyCallback
      ): Promise<void> => {
        if (!idToken) {
          verified(new Error("Could not get id_token from Apple"));
          return;
        }

        const { email, sub } = jwtService.decode(idToken) as { email: string; sub: string };
        if (!sub) {
          verified(new Error("Could not find sub ID in Apple token"));
          return;
        }
        if (!email) {
          verified(new Error("Could not find email in Apple token"));
          return;
        }

        verified(undefined, { sub, email });
      }
    );
  }
  public authenticate(req: Request, options: ApplePassportStrategy.AuthenticateOptions): void {
    const queryParams = req.body;
    console.log("APPLE AUTH", queryParams);
    super.authenticate(req, { ...options, state: JSON.stringify(queryParams) });
  }
}
