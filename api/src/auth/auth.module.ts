import { Module } from "@nestjs/common";
import { CqrsModule } from "@nestjs/cqrs";
import { UserPresenter } from "src/user/interface/user.presenter";
import { authApplications } from "./core/application/auth.application";
import { authInfrastructure } from "./infrastructure/auth.infrastructure";
import { authInterface } from "./interface/auth.interface";

@Module({
  imports: [CqrsModule, UserPresenter],
  providers: [...authInterface.resolvers, ...authInfrastructure.providers, ...authApplications],
  controllers: [...authInterface.controllers],
  exports: [],
})
export class authModule {}
