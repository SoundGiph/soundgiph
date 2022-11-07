import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { PassportStrategy } from "@nestjs/passport";
import { Request } from "express";
import * as ApplePassportStrategy from "passport-apple";
import * as path from "path";
import { dirname } from "path";
import { UserEntity } from "../../../user/core/domain/user.entity";
import { AuthSocialProvider } from "../../core/application/ports/auth.port";
@Injectable()
export class AppleStrategy extends PassportStrategy(ApplePassportStrategy, "apple") {
  constructor(jwtService: JwtService) {
    super(
      {
        clientID: process.env.APPLE_CLIENT_ID,
        teamID: process.env.APPLE_TEAM_ID,
        callbackURL: process.env.APPLE_CALLBACK_URL,
        keyID: process.env.APPLE_KEY_ID,
        privateKeyLocation: path.join(
          dirname(require.main.filename),
          `../secrets/${process.env.APPLE_KEY_ID}.p8`
        ),
        passReqToCallback: false,
      },
      async (
        _accessToken: string,
        _refreshToken: string,
        idToken: string,
        _profile: Record<string, never>,
        verified: ApplePassportStrategy.VerifyCallback
      ): Promise<Partial<UserEntity>> => {
        console.log("APPLE REFRESHTOKEN >", jwtService.decode(_refreshToken));
        console.log("APPLE IDTOKEN >", jwtService.decode(idToken));
        console.log("APPLE PAYLOAD >", {
          _accessToken,
          _refreshToken,
          idToken,
          _profile,
          verified,
        });
        if (!idToken) {
          verified(new Error("Could not get id_token from Apple"));
          return;
        }

        console.log("jwtService > DECODE > ", jwtService.decode(idToken));
        const { email, sub, name } = jwtService.decode(idToken) as {
          email: string;
          sub: string;
          name?: {
            firstname?: string;
            lastname?: string;
          };
        };
        if (!sub) {
          verified(new Error("Could not find sub ID in Apple token"));
          return;
        }
        if (!email) {
          verified(new Error("Could not find email in Apple token"));
          return;
        }

        return verified(undefined, {
          providerId: sub,
          email,
          firstname: name?.firstname || null,
          lastname: name?.lastname || null,
          provider: AuthSocialProvider.APPLE,
        });
      }
    );
  }
  public authenticate(req: Request, options: ApplePassportStrategy.AuthenticateOptions): void {
    const queryParams = req.body;
    super.authenticate(req, { ...options, state: JSON.stringify(queryParams) });
  }
}
