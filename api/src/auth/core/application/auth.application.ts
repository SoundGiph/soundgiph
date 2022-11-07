const authQueryHandlers = [] as const;
const authCommandHandlers = [] as const;

export const authApplications = [...authQueryHandlers, ...authCommandHandlers];
