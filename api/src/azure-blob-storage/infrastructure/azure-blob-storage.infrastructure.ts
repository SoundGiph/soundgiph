import { AzureBlobStoragePort } from '../core/application/ports/azure-blob-storage.port';
import { AzureBlobStorageAdapter } from './azure-blob-storage.adapter';

export const AzureBlobStorageInfrastructure = {
  providers: [
    { provide: AzureBlobStoragePort, useClass: AzureBlobStorageAdapter },
  ],
};
