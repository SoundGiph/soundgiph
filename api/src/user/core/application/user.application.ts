import { CreateUserCommandHandler } from "./commands/create-user.command-handler";
import { FindUserCommandHandler } from "./queries/find-user.query-handler";

const userQueryHandlers = [FindUserCommandHandler] as const;
const userCommandHandlers = [CreateUserCommandHandler] as const;

export const userApplications = [...userQueryHandlers, ...userCommandHandlers];
