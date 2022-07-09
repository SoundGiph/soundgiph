import { UserEntity } from "../../domain/user.entity";

export abstract class UserPort {
  abstract findOne(id: UserEntity["id"]): Promise<UserEntity>;
}
