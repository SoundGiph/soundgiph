import { Module } from "@nestjs/common";
import { CqrsModule } from "@nestjs/cqrs";
import { JwtModule } from "@nestjs/jwt";
import { UserPresenter } from "../user/interface/user.presenter";
import { UserModule } from "../user/user.module";
import { authApplications } from "./core/application/auth.application";
import { authInfrastructure } from "./infrastructure/auth.infrastructure";
import { authInterface } from "./interface/auth.interface";

@Module({
  imports: [CqrsModule, UserPresenter, UserModule, JwtModule],
  providers: [...authInterface.resolvers, ...authInfrastructure.providers, ...authApplications],
  controllers: [...authInterface.controllers],
  exports: [],
})
export class AuthModule {}
