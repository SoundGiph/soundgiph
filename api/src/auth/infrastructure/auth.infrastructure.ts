import { AuthPort } from "../core/application/ports/auth.port";
import { AuthAdapter } from "./auth.adapter";
import { AppleStrategy } from "./strategies/apple.strategy";
import { GoogleStrategy } from "./strategies/google.strategy";
import { LocalStrategy } from "./strategies/local.strategy";

export const authInfrastructure = {
  providers: [
    AppleStrategy,
    GoogleStrategy,
    LocalStrategy,
    { provide: AuthPort, useClass: AuthAdapter },
  ],
  repositories: [],
};
