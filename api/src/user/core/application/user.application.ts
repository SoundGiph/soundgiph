import { CreateUserCommandHandler } from "./commands/create-user/create-user.command-handler";
import { DeleteUserCommandHandler } from "./commands/delete-user/delete-user.command-handler";
import { FindUserCommandHandler } from "./queries/find-user.query-handler";

const userQueryHandlers = [FindUserCommandHandler] as const;
const userCommandHandlers = [CreateUserCommandHandler, DeleteUserCommandHandler] as const;

export const userApplications = [...userQueryHandlers, ...userCommandHandlers];
