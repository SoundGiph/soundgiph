import { UserEntity } from "../core/domain/user.entity";
import { UserAdapter } from "./user.adapter";
import { UserPresenter } from "./user.presenter";

export const userInfrastructure = {
  providers: [{ provide: UserEntity, useClass: UserAdapter }, UserPresenter],
};
