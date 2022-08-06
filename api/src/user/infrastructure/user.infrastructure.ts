import { UserEntity } from "../core/domain/user.entity";
import { UserPresenter } from "../interface/user.presenter";
import { UserAdapter } from "./user.adapter";

export const userInfrastructure = {
  providers: [{ provide: UserEntity, useClass: UserAdapter }, UserPresenter],
};
