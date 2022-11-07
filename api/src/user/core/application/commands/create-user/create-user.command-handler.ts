import { Inject, Logger } from "@nestjs/common";
import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { UserEntity } from "../../../domain/user.entity";
import { UserPort } from "../../ports/user.port";

import { CreateUserCommand } from "./create-user.command";

@CommandHandler(CreateUserCommand)
export class CreateUserCommandHandler implements ICommandHandler<CreateUserCommand> {
  private readonly logger = new Logger();
  constructor(
    @Inject(UserEntity)
    private readonly CreateUserPort: Pick<UserPort, "create">
  ) {}

  public async execute({ payload }: CreateUserCommand): Promise<UserEntity> {
    try {
      this.logger.log(`CreateUserCommandHandler > called with payload: ${JSON.stringify(payload)}`);
      const user = await this.CreateUserPort.create(payload);
      return user;
    } catch (error) {
      this.logger.error(`CreateUserCommandHandler > failed with :${error}`);
    }
  }
}
