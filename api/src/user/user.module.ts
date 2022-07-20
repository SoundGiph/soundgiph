import { Module } from "@nestjs/common";
import { CqrsModule } from "@nestjs/cqrs";
import { TypeOrmModule } from "@nestjs/typeorm";
import { userApplications } from "./core/application/user.application";
import { userInfrastructure } from "./infrastructure/user.infrastructure";
import { userInterface } from "./interface/user.interface";
import { UserPresenter } from "./interface/user.presenter";

@Module({
  imports: [TypeOrmModule.forFeature([...userInfrastructure.repositories]), CqrsModule],
  providers: [...userInterface.resolvers, ...userInfrastructure.providers, ...userApplications],
  controllers: [...userInterface.controllers],
  exports: [UserPresenter],
})
export class userModule {}
