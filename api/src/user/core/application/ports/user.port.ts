import { FindOneOptions } from "typeorm";
import { UserEntity } from "../../domain/user.entity";

export abstract class UserPort {
  abstract findOne(id: FindOneOptions<UserEntity>): Promise<UserEntity | undefined>;
  abstract create(payload: Partial<UserEntity>): Promise<UserEntity>;
}
