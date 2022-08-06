import { Controller, Get, Req, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { Request } from "express";
import "multer";
import { UserEntity } from "../../user/core/domain/user.entity";
import { AuthPort, AuthSocialProvider } from "../core/application/ports/auth.port";
@Controller("auth")
export class AuthController {
  constructor(private readonly authPort: AuthPort) {}

  @Get("google")
  @UseGuards(AuthGuard("google"))
  async googleAuth(@Req() req: Request): Promise<void> {
    console.log(req);
  }

  @Get("google/redirect")
  @UseGuards(AuthGuard("google"))
  googleAuthRedirect(@Req() req: Request): Promise<UserEntity> {
    const { body } = req;
    return this.authPort.socialSignup({ ...body, provider: AuthSocialProvider.GOOGLE });
  }
}
