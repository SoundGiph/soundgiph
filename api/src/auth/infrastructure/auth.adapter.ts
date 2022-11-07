import { Injectable, Logger, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import axios from "axios";
import { AuthPort, GetTikTokUserPayload } from "../../auth/core/application/ports/auth.port";
import { UserEntity } from "../../user/core/domain/user.entity";
import { UserPresenter } from "../../user/infrastructure/user.presenter";
import { SocialSignupSuccessResponse } from "./strategies/google.strategy";

const TIK_TOK_BASIC_INFO_URL = `https://open-api.tiktok.com/user/info/`;
@Injectable()
export class AuthAdapter implements AuthPort {
  logger = new Logger();
  constructor(private readonly userPresenter: UserPresenter, private jwtService: JwtService) {}
  public async getTikTokUser(payload: GetTikTokUserPayload): Promise<void> {
    return axios.post(TIK_TOK_BASIC_INFO_URL, payload);
  }

  public async socialSignup(payload: SocialSignupSuccessResponse): Promise<UserEntity> {
    this.logger.log(`AuthAdapter > socialSignup > called with : ${payload}`);
    try {
      const { user: existingUser } = await this.userPresenter.findOne({
        where: { providerId: payload.providerId, provider: payload.provider },
      });
      if (existingUser) {
        return existingUser;
      }
      const user = await this.userPresenter.create({ ...payload });
      console.log("SOCIAL SIGNUP USER", user);
      return user;
    } catch (error) {
      this.logger.error(`AuthAdapter > socialSignup > failed with : ${error}`);
    }
  }

  public async validateUser(userId: string): Promise<UserEntity | undefined> {
    try {
      if (!userId) throw new UnauthorizedException();
      const { user } = await this.userPresenter.findOne({
        where: {
          id: userId,
        },
      });
      if (!user) return undefined;
      return user;
    } catch (error) {
      this.logger.error(`AuthAdapter > validateJwt > failed with : ${error}`);
    }
  }

  public signJwt(id: string): string {
    return this.jwtService.sign({ id });
  }
}
