import { Controller, Get } from "@nestjs/common";
import { QueryBus } from "@nestjs/cqrs";
import "multer";
import passport from "passport";
@Controller()
export class AuthController {
  constructor(private readonly queryBus: QueryBus) {}

  // @Get("/tiktok/auth")
  // tiktokAuth(): void {
  //   passport.authenticate("tiktok");
  // }

  // @Get("/tiktok/auth/callback")
  // tiktokAuthCallback(): void {
  //   passport.authenticate("tiktok", (req: Request, res: Response) => {
  //     const user = res.
  //   });
  // }
}
