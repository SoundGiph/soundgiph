import * as faker from "faker";
import * as uuid from "uuid";
import { AuthSocialProvider } from "../../../auth/core/application/ports/auth.port";
import { UserEntity } from "./user.entity";

export const userFixtureFactory = (partialUser: Partial<UserEntity>): UserEntity => {
  return Object.assign(new UserEntity(), {
    id: uuid.v4(),
    providerId: uuid.v4(),
    provider: AuthSocialProvider.GOOGLE,
    email: faker.internet.email(),
    lastname: faker.name.lastName(),
    firstname: faker.name.firstName(),
    picture: faker.image.avatar(),
    deviceId: uuid.v4(),
    ...partialUser,
  }) as UserEntity;
};
