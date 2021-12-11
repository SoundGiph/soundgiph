import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AzureBlobStorageApplications } from './core/application/azure-blob-storage.application';
import { AzureBlobStorageInfrastructure } from './infrastructure/azure-blob-storage.infrastructure';
import { AzureBlobStorageInterface } from './interface/azure-blob-storage.interface';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forFeature([...AzureBlobStorageInfrastructure.repositories]),
    CqrsModule,
  ],
  providers: [
    ...AzureBlobStorageInterface.resolvers,
    ...AzureBlobStorageInfrastructure.providers,
    ...AzureBlobStorageApplications,
  ],
  controllers: [...AzureBlobStorageInterface.controllers],
  exports: [],
})
export class AzureBlobStorageModule {}
