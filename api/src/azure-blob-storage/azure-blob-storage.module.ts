import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CqrsModule } from '@nestjs/cqrs';
import { AzureBlobStorageApplications } from './core/application/azure-blob-storage.application';
import { AzureBlobStorageInfrastructure } from './infrastructure/azure-blob-storage.infrastructure';
import { AzureBlobStorageInterface } from './interface/azure-blob-storage.interface';

@Module({
  imports: [ConfigModule.forRoot(), CqrsModule],
  providers: [
    ...AzureBlobStorageInterface.presenters,
    ...AzureBlobStorageInfrastructure.providers,
    ...AzureBlobStorageApplications,
  ],
  exports: [...AzureBlobStorageInterface.presenters],
})
export class AzureBlobStorageModule {}
