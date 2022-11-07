import { Controller, Get, Post, Req, Res, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { Request, Response } from "express";
import { UserEntity } from "src/user/core/domain/user.entity";
import { AuthPort } from "../core/application/ports/auth.port";
import { SocialSignupSuccessResponse } from "../infrastructure/strategies/google.strategy";

export interface AuthGoogleAuthenticatedRequest extends Request {
  user?: SocialSignupSuccessResponse;
}

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthPort) {}

  private generateJWTAndRedirectToWebApp(id: UserEntity["id"], res: Response): void {
    console.log("USER ID", id);
    const accessToken = this.authService.signJwt(id);
    res.cookie("access_token", accessToken);
    res.redirect(process.env.VOZO_APP_URL);
  }

  @Get("google")
  @UseGuards(AuthGuard("google"))
  async googleAuth(): Promise<void> {
    return;
  }

  @Get("google/callback")
  @UseGuards(AuthGuard("google"))
  async googleAuthRedirect(
    @Req() req: AuthGoogleAuthenticatedRequest,
    @Res() res: Response
  ): Promise<void> {
    const { user: partialUser } = req;
    const user = await this.authService.socialSignup(partialUser);
    console.log("USER", user.id);
    return this.generateJWTAndRedirectToWebApp(user.id, res);
  }

  @Get("apple")
  @UseGuards(AuthGuard("apple"))
  async appleAuth(): Promise<void> {
    return;
  }

  @Post("apple/callback")
  @UseGuards(AuthGuard("apple"))
  async appleAuthRedirect(@Req() req: Request, @Res() res: Response): Promise<void> {
    const { user: partialUser } = req;
    const user = await this.authService.socialSignup(partialUser);
    return this.generateJWTAndRedirectToWebApp(user.id, res);
  }
}
