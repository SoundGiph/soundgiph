import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Request } from "express";
import { JwtService } from "@nestjs/jwt";
import * as ApplePassportStrategy from "passport-apple";

@Injectable()
export class AppleStrategy extends PassportStrategy(ApplePassportStrategy, "apple") {
  constructor(jwtService: JwtService) {
    // const BACKEND_URL = "";
    // const callbackURL = `${BACKEND_URL}${AUTH_CONTROLLER_URLS.BASE_URL}${AUTH_CONTROLLER_URLS.APPLE_CALLBACK}`;
    super(
      {
        clientID: process.env.APPLE_CLIENT_ID,
        teamID: process.env.APPLE_TEAM_ID,
        callbackURL: "",
        keyID: process.env.APPLE_KEY_ID,
        privateKeyLocation: process.env.APPLE_PRIVATE_KEY_LOCATION,
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
    const queryParams = req.query;
    super.authenticate(req, { ...options, state: JSON.stringify(queryParams) });
  }
}
