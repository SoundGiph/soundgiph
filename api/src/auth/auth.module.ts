import { Module } from "@nestjs/common";
import { CqrsModule } from "@nestjs/cqrs";
import { TypeOrmModule } from "@nestjs/typeorm";
import { authApplications } from "./core/application/auth.application";
import { authInfrastructure } from "./infrastructure/auth.infrastructure";
import { authInterface } from "./interface/auth.interface";

@Module({
  imports: [TypeOrmModule.forFeature([...authInfrastructure.repositories]), CqrsModule],
  providers: [...authInterface.resolvers, ...authInfrastructure.providers, ...authApplications],
  controllers: [...authInterface.controllers],
  exports: [],
})
export class authModule {}

