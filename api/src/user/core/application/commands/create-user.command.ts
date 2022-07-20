import { ICommand } from "@nestjs/cqrs";
import { UserEntity } from "../../domain/user.entity";

export class CreateUserCommand implements ICommand {
  constructor(public readonly payload: Partial<UserEntity>) {}
}

export class CreateUserCommandResult {
  constructor(public readonly user: UserEntity) {}
}
