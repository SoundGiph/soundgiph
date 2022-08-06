import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Request } from "express";
import { Strategy, StrategyOptions, VerifyCallback } from "passport-google-oauth20";

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
    profile: {
      id: string;
      name: { givenName: string; familyName: string };
      emails: { value: string }[];
    },
    done: VerifyCallback
  ): Promise<void> {
    const { name, emails, id } = profile;
    const user = {
      sub: id,
      email: emails[0].value,
      firstname: name.givenName,
      lastname: name.familyName,
      accessToken,
    };
    done(undefined, user);
  }

  public authenticate(req: Request, options: StrategyOptions): void {
    const queryParams = req.query;
    super.authenticate(req, { ...options, state: JSON.stringify(queryParams) });
  }
}
