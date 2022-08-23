import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Request } from "express";
import { Strategy, StrategyOptions } from "passport-google-oauth20";
import { UserEntity } from "../../../user/core/domain/user.entity";
import { AuthSocialProvider } from "../../core/application/ports/auth.port";

interface GoogleProfile {
  id: string;
  _json: {
    email: string;
    given_name: string;
    family_name: string;
    picture: string;
  };
}

export interface GoogleValidateResponse extends Partial<UserEntity> {
  accessToken: string;
  _refreshToken: string;
}

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, "google") {
  constructor() {
    super({
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL,
      scope: ["email", "profile", "openid"],
    });
  }

  public async validate(
    accessToken: string,
    _refreshToken: string,
    profile: GoogleProfile
  ): Promise<GoogleValidateResponse> {
    const { _json, id } = profile;
    const user: Partial<UserEntity> = {
      providerId: id,
      email: _json.email,
      firstname: _json.given_name,
      lastname: _json.family_name,
      picture: _json.picture,
      provider: AuthSocialProvider.GOOGLE,
    };
    console.log("PROFILE", profile);
    return { ...user, accessToken, _refreshToken };
  }

  public authenticate(req: Request, options: StrategyOptions): void {
    const queryParams = req.query;
    super.authenticate(req, {
      ...options,
      state: JSON.stringify(queryParams),
    });
  }
}
