import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { UserEntity } from "src/user/core/domain/user.entity";
import { JWT_SECRET } from "../../../../secrets/constants";
import { AuthPort } from "../../core/application/ports/auth.port";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthPort) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: JWT_SECRET,
    });
  }

  async validate({ id }: { id: string }): Promise<UserEntity> {
    console.log("ID", id);
    const user = await this.authService.validateUser(id);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
