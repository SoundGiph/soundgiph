import { UserEntity } from "src/user/core/domain/user.entity";

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
  googleAnalyticsId?: string;
  phone?: string;
  isPhoneVerified?: boolean;
}

export interface GetTikTokUserPayload {
  accessToken: string;
  openId: string;
}

export abstract class AuthPort {
  abstract socialSignup(payload: SocialSignupPayload): Promise<UserEntity>;
  abstract getTikTokUser(payload: GetTikTokUserPayload): Promise<void>;
}
