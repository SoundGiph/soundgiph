import { Injectable, Logger } from "@nestjs/common";
import axios from "axios";
import {
  AuthPort,
  GetTikTokUserPayload,
  SocialSignupPayload,
} from "../../auth/core/application/ports/auth.port";
import { UserEntity } from "../../user/core/domain/user.entity";
import { UserPresenter } from "../../user/infrastructure/user.presenter";
import { GoogleValidateResponse } from "./strategies/google.strategy";

const TIK_TOK_BASIC_INFO_URL = `https://open-api.tiktok.com/user/info/`;
@Injectable()
export class AuthAdapter implements AuthPort {
  logger = new Logger();
  constructor(private readonly userPresenter: UserPresenter) {}
  public async getTikTokUser(payload: GetTikTokUserPayload): Promise<void> {
    return axios.post(TIK_TOK_BASIC_INFO_URL, payload);
  }

  public async googleSignup(payload: GoogleValidateResponse): Promise<UserEntity> {
    try {
      const { user: existingUser } = await this.userPresenter.findOne({
        where: { providerId: payload.providerId, provider: payload.provider },
      });
      if (existingUser) {
        return existingUser;
      }
      const user = await this.userPresenter.create({ ...payload });
      return user;
    } catch (error) {
      this.logger.error(`AuthAdapter > googleSignup > failed with : ${error}`);
    }
  }

  public async socialSignup(payload: SocialSignupPayload): Promise<void> {
    try {
      console.log("PAYLOAD", payload);
    } catch (error) {
      this.logger.error(`AuthAdapter > socialSignup > failed with : ${error}`);
    }
  }
}
