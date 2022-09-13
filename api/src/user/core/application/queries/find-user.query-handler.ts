import { Inject, Logger } from "@nestjs/common";
import { ICommandHandler, QueryHandler } from "@nestjs/cqrs";
import { UserEntity } from "../../domain/user.entity";
import { UserPort } from "../ports/user.port";
import { FindUserCommand, FindUserCommandResult } from "./find-user.query";

@QueryHandler(FindUserCommand)
export class FindUserCommandHandler implements ICommandHandler<FindUserCommand> {
  logger = new Logger();
  constructor(
    @Inject(UserEntity)
    private readonly findUserPort: Pick<UserPort, "findOne">
  ) {}

  public async execute({ payload }: FindUserCommand): Promise<FindUserCommandResult> {
    this.logger.log(`FindUserCommandHandler > called with payload: ${JSON.stringify(payload)}`);
    const user = await this.findUserPort.findOne(payload);
    return new FindUserCommandResult(user);
  }
}