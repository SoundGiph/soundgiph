import { UserPort } from "../core/application/ports/user.port";
import { UserPresenter } from "../interface/user.presenter";
import { UserAdapter } from "./user.adapter";

export const userInfrastructure = {
  providers: [UserPresenter, { provide: UserPort, useClass: UserAdapter }],
  repositories: [],
};
