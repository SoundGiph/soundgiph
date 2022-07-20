import { CommandBus, QueryBus } from "@nestjs/cqrs";
import { InjectRepository } from "@nestjs/typeorm";
import { FindOneOptions } from "typeorm";
import {
  CreateUserCommand,
  CreateUserCommandResult,
} from "../core/application/commands/create-user.command";
import {
  FindUserCommand,
  FindUserCommandResult,
} from "../core/application/queries/find-user.command";
import { UserEntity } from "../core/domain/user.entity";

export class UserPresenter {
  constructor(
    @InjectRepository(UserEntity)
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus
  ) {}

  public async findOne(options: FindOneOptions<UserEntity>): Promise<UserEntity> {
    return await this.queryBus.execute<FindUserCommand, FindUserCommandResult["user"]>(
      new FindUserCommand(options)
    );
  }

  public async create(payload: Partial<UserEntity>): Promise<UserEntity> {
    return await this.commandBus.execute<CreateUserCommand, CreateUserCommandResult["user"]>(
      new CreateUserCommand(payload)
    );
  }
}
