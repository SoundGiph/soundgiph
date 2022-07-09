const userQueryHandlers = [] as const;
const userCommandHandlers = [] as const;

export const userApplications = [...userQueryHandlers, ...userCommandHandlers];
