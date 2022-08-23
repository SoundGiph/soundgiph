import { Injectable } from "@nestjs/common";
import { CommandBus, QueryBus } from "@nestjs/cqrs";
import { FindOneOptions } from "typeorm";
import {
  CreateUserCommand,
  CreateUserCommandResult,
} from "../core/application/commands/create-user/create-user.command";
import {
  FindUserCommand,
  FindUserCommandResult,
} from "../core/application/queries/find-user.query";
import { UserEntity } from "../core/domain/user.entity";

@Injectable()
export class UserPresenter {
  constructor(private readonly commandBus: CommandBus, private readonly queryBus: QueryBus) {}

  public async findOne(options: FindOneOptions<UserEntity>): Promise<FindUserCommandResult> {
    return await this.queryBus.execute<FindUserCommand, FindUserCommandResult>(
      new FindUserCommand(options)
    );
  }

  public async create(payload: Partial<UserEntity>): Promise<UserEntity> {
    return await this.commandBus.execute<CreateUserCommand, CreateUserCommandResult["user"]>(
      new CreateUserCommand(payload)
    );
  }
}
