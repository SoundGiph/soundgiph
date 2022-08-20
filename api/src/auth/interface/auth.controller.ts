import { Controller, Get, Post, Req, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { Request } from "express";
import "multer";
import { UserEntity } from "../../user/core/domain/user.entity";
import {
  AuthPort,
  AuthSocialProvider,
  SocialSignupPayload,
} from "../core/application/ports/auth.port";
@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthPort) {}

  @Get("google")
  @UseGuards(AuthGuard("google"))
  async googleAuth(@Req() req: Request): Promise<void> {
    console.log("GOOGLE AUTH", req);
  }

  @Get("google/callback")
  @UseGuards(AuthGuard("google"))
  async googleAuthRedirect(@Req() req: Request): Promise<UserEntity> {
    const { user } = req;
    return await this.authService.socialSignup({
      ...(user as SocialSignupPayload),
      provider: AuthSocialProvider.GOOGLE,
    });
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
    return this.authService.socialSignup({ ...body, provider: AuthSocialProvider.APPLE });
  }
}
