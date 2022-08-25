import { SocialSignupSuccessResponse } from "src/auth/infrastructure/strategies/google.strategy";
import { UserEntity } from "../../../../user/core/domain/user.entity";

export enum AuthSocialProvider {
  GOOGLE = "GOOGLE",
  APPLE = "APPLE",
  TIKTOK = "TIKTOK",
}

export interface SocialSignupPayload<T = AuthSocialProvider> {
  sub: string;
  email?: string;
  provider: T;
  firstname?: string;
  lastname?: string;
  picture?: string;
}

export interface GetTikTokUserPayload {
  accessToken: string;
  openId: string;
}

export abstract class AuthPort {
  abstract socialSignup(payload: SocialSignupSuccessResponse): Promise<UserEntity>;
  abstract getTikTokUser(payload: GetTikTokUserPayload): Promise<void>;
  abstract validateUser(id: string): Promise<UserEntity | undefined>;
  abstract signJwt(id: string): string;
}
