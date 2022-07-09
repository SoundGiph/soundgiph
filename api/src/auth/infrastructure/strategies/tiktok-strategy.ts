import { PassportStrategy } from "@nestjs/passport";
import * as TiktokStrategy from "passport-tiktok-auth";

export class TiktokLoginStrategy extends PassportStrategy(
  new TiktokStrategy({
    clientID: process.env.TIKTOK_CLIENT_ID,
    clientSecret: process.env.TIKTOK_CLIENT_SECRET,
    scope: ["user.info.basic"],
    callbackURL: process.env.TIKTOK_CALLBACK_URL,
  }),
  "tiktok"
) {}
