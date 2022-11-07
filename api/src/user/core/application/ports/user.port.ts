import { FindOneOptions } from "typeorm";
import { UserEntity } from "../../domain/user.entity";

export abstract class UserPort {
  abstract findOne(options: FindOneOptions<UserEntity>): Promise<UserEntity | undefined>;
  abstract create(payload: Partial<UserEntity>): Promise<UserEntity>;
  abstract delete(id: UserEntity["id"]): Promise<boolean>;
}
