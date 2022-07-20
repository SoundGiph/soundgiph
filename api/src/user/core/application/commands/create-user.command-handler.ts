import { Inject } from "@nestjs/common";
import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { UserEntity } from "../../domain/user.entity";
import { UserPort } from "../ports/user.port";
import { CreateUserCommand, CreateUserCommandResult } from "./create-user.command";

@CommandHandler(CreateUserCommand)
export class CreateUserCommandHandler implements ICommandHandler<CreateUserCommand> {
  constructor(
    @Inject(UserEntity)
    private readonly CreateUserPort: Pick<UserPort, "create">
  ) {}

  public async execute({ payload }: CreateUserCommand): Promise<CreateUserCommandResult> {
    const user = await this.CreateUserPort.create(payload);
    return new CreateUserCommandResult(user);
  }
}
