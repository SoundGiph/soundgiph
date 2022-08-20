import { Injectable, Logger } from "@nestjs/common";
import axios from "axios";
import { FindOneOptions, Like } from "typeorm";
import {
  AuthPort,
  AuthSocialProvider,
  GetTikTokUserPayload,
  SocialSignupPayload,
} from "../../auth/core/application/ports/auth.port";
import { UserEntity } from "../../user/core/domain/user.entity";
import { UserPresenter } from "../../user/interface/user.presenter";

const TIK_TOK_BASIC_INFO_URL = `https://open-api.tiktok.com/user/info/`;
@Injectable()
export class AuthAdapter implements AuthPort {
  logger = new Logger();
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
    try {
      const { sub, provider } = payload;
      const findOptions = this.buildFindOneOptionsByAuthSocialProvider(sub, provider);
      const { user: existingUser } = await this.userPresenter.findOne(findOptions);
      if (existingUser) {
        return existingUser;
      }
      const partialUser = this.buildPartialUserByAuthSocialProvider(payload);
      const user = await this.userPresenter.create(partialUser);
      return user;
    } catch (error) {
      this.logger.error(`AuthAdapter > socialSignup > failed with : ${error}`);
    }
  }
}
