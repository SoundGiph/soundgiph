import {
  GetTikTokUserPayload,
  AuthPort,
  AuthSocialProvider,
  SocialSignupPayload,
} from "src/auth/core/application/ports/auth.port";
import axios from "axios";
import { UserEntity } from "src/user/core/domain/user.entity";
import { UserPresenter } from "src/user/interface/user.presenter";
import { FindOneOptions, Like } from "typeorm";

const TIK_TOK_BASIC_INFO_URL = `https://open-api.tiktok.com/user/info/`;

export class AuthAdapter implements AuthPort {
  constructor(private readonly userPresenter: UserPresenter) {}
  public async getTikTokUser(payload: GetTikTokUserPayload): Promise<void> {
    return axios.post(TIK_TOK_BASIC_INFO_URL, payload);
  }

  private buildFindOneOptionsByAuthSocialProvider(
    sub: string,
    provider: AuthSocialProvider
  ): FindOneOptions<UserEntity> {
    switch (provider) {
      case AuthSocialProvider.APPLE:
        return { where: { applePayload: Like(`%${sub}%`) } };
      case AuthSocialProvider.GOOGLE:
        return { where: { googlePayload: Like(`%${sub}%`) } };
      case AuthSocialProvider.TIKTOK:
        return { where: { tiktokPayload: Like(`%${sub}%`) } };
    }
  }

  private buildPartialUserByAuthSocialProvider(payload: SocialSignupPayload): Partial<UserEntity> {
    const { provider } = payload;
    switch (provider) {
      case AuthSocialProvider.APPLE:
        return { applePayload: JSON.stringify(payload) };
      case AuthSocialProvider.GOOGLE:
        return { googlePayload: JSON.stringify(payload) };
      case AuthSocialProvider.TIKTOK:
        return { tiktokPayload: JSON.stringify(payload) };
    }
  }

  public async socialSignup(payload: SocialSignupPayload): Promise<UserEntity> {
    const { sub, provider } = payload;
    const findOptions = this.buildFindOneOptionsByAuthSocialProvider(sub, provider);
    const existingUser = this.userPresenter.findOne(findOptions);
    if (existingUser) {
      return existingUser;
    }
    const partialUser = this.buildPartialUserByAuthSocialProvider(payload);
    const user = this.userPresenter.create(partialUser);
    return user;
  }
}
