import { AuthPort } from "../core/application/ports/auth.port";
import { AuthAdapter } from "./auth.adapter";
import { AppleStrategy } from "./strategies/apple.strategy";
import { GoogleStrategy } from "./strategies/google.strategy";

export const authInfrastructure = {
  providers: [AppleStrategy, GoogleStrategy, { provide: AuthPort, useClass: AuthAdapter }],
  repositories: [],
};
