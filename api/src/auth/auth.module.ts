import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { TypeOrmModule } from "@nestjs/typeorm";
import { JWT_SECRET } from "../../secrets/constants";
import { UserEntity } from "../user/core/domain/user.entity";
import { UserModule } from "../user/user.module";
import { authApplications } from "./core/application/auth.application";
import { authInfrastructure } from "./infrastructure/auth.infrastructure";
import { authInterface } from "./interface/auth.interface";

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity]),
    UserModule,
    JwtModule.register({
      secret: JWT_SECRET,
      signOptions: { expiresIn: "7d" },
    }),
  ],
  providers: [...authInterface.resolvers, ...authInfrastructure.providers, ...authApplications],
  controllers: [...authInterface.controllers],
  exports: [],
})
export class AuthModule {}
