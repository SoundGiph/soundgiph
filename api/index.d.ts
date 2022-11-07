import { UserEntity } from "src/user/core/domain/user.entity";

declare global {
  interface Request {
    user?: Patial<UserEntity>;
    accessToken?: string;
    _refreshToken?: string;
  }
}
