import { Controller, Get, Req, Res, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { Response } from "express";
import { AuthPort } from "../core/application/ports/auth.port";
import { GoogleValidateResponse } from "../infrastructure/strategies/google.strategy";

export interface AuthGoogleAuthenticatedRequest extends Request {
  user?: GoogleValidateResponse;
}

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthPort) {}

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
    const user = await this.authService.googleSignup(partialUser);
    const accessToken = this.authService.signJwt(user.id);
    res.cookie("access_token", accessToken);
    res.redirect(process.env.VOZO_APP_URL);
  }
}
