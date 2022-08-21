import { Module } from "@nestjs/common";
import { CqrsModule } from "@nestjs/cqrs";
import { TypeOrmModule } from "@nestjs/typeorm";
import { userApplications } from "./core/application/user.application";
import { UserEntity } from "./core/domain/user.entity";
import { userInfrastructure } from "./infrastructure/user.infrastructure";
import { UserPresenter } from "./infrastructure/user.presenter";
import { userInterface } from "./interface/user.interface";

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity]), CqrsModule],
  providers: [...userInfrastructure.providers, ...userApplications],
  controllers: [...userInterface.controllers],
  exports: [UserPresenter],
})
export class UserModule {}
