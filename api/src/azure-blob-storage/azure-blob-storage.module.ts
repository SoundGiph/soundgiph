import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CqrsModule } from '@nestjs/cqrs';
import { AzureBlobStorageApplications } from './core/application/azure-blob-storage.application';
import { AzureBlobStorageInfrastructure } from './infrastructure/azure-blob-storage.infrastructure';
import { AzureBlobStorageInterface } from './interface/azure-blob-storage.interface';

@Module({
  imports: [ConfigModule, CqrsModule],
  providers: [
    ...AzureBlobStorageInfrastructure.providers,
    ...AzureBlobStorageApplications,
    ...AzureBlobStorageInterface.presenters,
  ],
  exports: [...AzureBlobStorageInterface.presenters],
})
export class AzureBlobStorageModule {}
