import { Inject, Logger } from "@nestjs/common";
import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { UserEntity } from "../../../domain/user.entity";
import { UserPort } from "../../ports/user.port";
import { DeleteUserCommand } from "./delete-user.command";

@CommandHandler(DeleteUserCommand)
export class DeleteUserCommandHandler implements ICommandHandler<DeleteUserCommand> {
  private readonly logger = new Logger();
  constructor(
    @Inject(UserEntity)
    private readonly DeleteUserPort: Pick<UserPort, "delete">
  ) {}

  public async execute({ id }: DeleteUserCommand): Promise<boolean> {
    try {
      this.logger.log(`DeleteUserCommandHandler > called with payload: ${JSON.stringify(id)}`);
      const isDeleted = await this.DeleteUserPort.delete(id);
      return isDeleted;
    } catch (error) {
      this.logger.error(`DeleteUserCommandHandler > failed with :${error}`);
    }
  }
}
