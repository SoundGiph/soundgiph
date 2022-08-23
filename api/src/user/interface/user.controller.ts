import { Controller, Get, HttpException, Req, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { UserEntity } from "../core/domain/user.entity";
import { UNAUTHORIZED_TO_GET_ME } from "../core/domain/user.errors";

export interface UserAuthenticatedRequest extends Request {
  user?: UserEntity;
}

@Controller("user")
export class UserController {
  @UseGuards(AuthGuard())
  @Get("me")
  async getMe(@Req() req: UserAuthenticatedRequest): Promise<UserEntity> {
    if (!req.user) {
      throw new HttpException(UNAUTHORIZED_TO_GET_ME, 401);
    }
    return req.user;
  }
}
