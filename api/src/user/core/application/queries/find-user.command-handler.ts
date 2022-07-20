import { Inject } from "@nestjs/common";
import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { UserEntity } from "../../domain/user.entity";
import { UserPort } from "../ports/user.port";
import { FindUserCommand, FindUserCommandResult } from "./find-user.command";

@CommandHandler(FindUserCommand)
export class FindUserCommandHandler implements ICommandHandler<FindUserCommand> {
  constructor(
    @Inject(UserEntity)
    private readonly FindUserPort: Pick<UserPort, "findOne">
  ) {}

  public async execute({ payload }: FindUserCommand): Promise<FindUserCommandResult> {
    const user = await this.FindUserPort.findOne(payload);
    return new FindUserCommandResult(user);
  }
}
