import { Controller, Get, Post, Req, UseGuards } from "@nestjs/common";
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
    console.log("GOOGLE AUTH", req);
  }

  @Post("google/callback")
  @UseGuards(AuthGuard("google"))
  googleAuthRedirect(@Req() req: Request): Promise<UserEntity> {
    const { body } = req;
    console.log("GOOGLE AUTH CALLBACK", body);
    return this.authPort.socialSignup({ ...body, provider: AuthSocialProvider.GOOGLE });
  }

  @Get("apple")
  @UseGuards(AuthGuard("apple"))
  async appleAuth(@Req() req: Request): Promise<void> {
    console.log("APPLE AUTH", req);
  }

  @Post("apple/callback")
  @UseGuards(AuthGuard("apple"))
  appleAuthRedirect(@Req() req: Request): Promise<UserEntity> {
    const { body } = req;
    console.log("APPLE AUTH CALLBACK", body);
    return this.authPort.socialSignup({ ...body, provider: AuthSocialProvider.APPLE });
  }
}
