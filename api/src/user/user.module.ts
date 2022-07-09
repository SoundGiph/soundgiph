import { Module } from "@nestjs/common";
import { CqrsModule } from "@nestjs/cqrs";
import { TypeOrmModule } from "@nestjs/typeorm";
import { userApplications } from "./core/application/user.application";
import { userInfrastructure } from "./infrastructure/user.infrastructure";
import { userInterface } from "./interface/user.interface";

@Module({
  imports: [TypeOrmModule.forFeature([...userInfrastructure.repositories]), CqrsModule],
  providers: [...userInterface.resolvers, ...userInfrastructure.providers, ...userApplications],
  controllers: [...userInterface.controllers],
  exports: [],
})
export class userModule {}

