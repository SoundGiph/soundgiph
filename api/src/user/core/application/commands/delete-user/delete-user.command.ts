import { ICommand } from "@nestjs/cqrs";
import { UserEntity } from "../../../domain/user.entity";

export class DeleteUserCommand implements ICommand {
  constructor(public readonly id: UserEntity["id"]) {}
}
