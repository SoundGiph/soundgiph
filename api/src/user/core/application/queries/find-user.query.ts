import { IQuery } from "@nestjs/cqrs";
import { FindOneOptions } from "typeorm";
import { UserEntity } from "../../domain/user.entity";

export class FindUserCommand implements IQuery {
  constructor(public readonly payload: FindOneOptions<UserEntity>) {}
}

export class FindUserCommandResult {
  constructor(public readonly user: UserEntity) {}
}
