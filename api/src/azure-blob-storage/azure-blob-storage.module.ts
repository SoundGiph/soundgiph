import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { CqrsModule } from "@nestjs/cqrs";
import { UploadFileToAzureStorageCommandHandler } from "./core/application/commands/upload-file-to-azure-storage/upload-file-to-azure-storage.command-handler";
import { AzureBlobStorageInfrastructure } from "./infrastructure/azure-blob-storage.infrastructure";
import { AzureBlobStoragePresenter } from "./interface/azure-blob-storage.presenter";

const AzureBlobStorageCommandHandler = [UploadFileToAzureStorageCommandHandler];
const AzureBlobStorageInterface = [AzureBlobStoragePresenter];
@Module({
  imports: [ConfigModule, CqrsModule],
  providers: [
    ...AzureBlobStorageInfrastructure.providers,
    ...AzureBlobStorageCommandHandler,
    ...AzureBlobStorageInterface,
  ],
  exports: [...AzureBlobStorageInterface],
})
export class AzureBlobStorageModule {}
