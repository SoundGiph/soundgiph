import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { CqrsModule } from "@nestjs/cqrs";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AzureBlobStorageModule } from "../azure-blob-storage/azure-blob-storage.module";
import { soundGifToApproveApplications } from "./core/application/sound-gif-to-approve.application";
import { soundGifToApproveInfrastructure } from "./infrastructure/sound-gif-to-approve.infrastructure";
import { soundGifToApproveInterface } from "./interface/sound-gif-to-approve.interface";

@Module({
  imports: [
    TypeOrmModule.forFeature([...soundGifToApproveInfrastructure.repositories]),
    CqrsModule,
    AzureBlobStorageModule,
    ConfigModule,
  ],
  providers: [
    ...soundGifToApproveInterface.resolvers,
    ...soundGifToApproveInfrastructure.providers,
    ...soundGifToApproveApplications,
  ],
  controllers: [...soundGifToApproveInterface.controllers],
  exports: [],
})
export class soundGifToApproveModule {}
