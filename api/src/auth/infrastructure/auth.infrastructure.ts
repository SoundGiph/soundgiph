import { AuthPort } from "../core/application/ports/auth.port";
import { AuthAdapter } from "./strategies/auth.adapter";

export const authInfrastructure = {
  providers: [{ provide: AuthPort, useClass: AuthAdapter }],
  repositories: [],
};
