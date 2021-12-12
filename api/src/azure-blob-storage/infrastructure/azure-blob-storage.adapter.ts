import { BlobServiceClient } from '@azure/storage-blob';
import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AZURE_BLOB_STORAGE_NO_CREDENTIALS } from '../../common/errors/errors-constants';
import { AzureBlobStoragePort } from '../core/application/ports/azure-blob-storage.port';

export class AzureBlobStorageAdapter implements AzureBlobStoragePort {
  constructor(public readonly configService: ConfigService) {}
  private readonly logger = new Logger();

  private connect(): BlobServiceClient {
    this.logger.log(`AzureBlobStorageAdapter > connect > start`);
    const azureStorageKey = this.configService.get<string>(
      'AZURE_STORAGE_KEY',
      undefined,
    );
    const azureStorageUrl = this.configService.get<string>(
      'AZURE_STORAGE_URL',
      undefined,
    );
    if (!azureStorageKey || !azureStorageUrl) {
      throw new Error(AZURE_BLOB_STORAGE_NO_CREDENTIALS);
    }
    const soundGifAzureBlobStorage =
      BlobServiceClient.fromConnectionString(azureStorageUrl);
    return soundGifAzureBlobStorage;
  }

  public async upload(
    file: File,
    fileName: string,
    containerName: string,
  ): Promise<string> {
    this.logger.log(
      `AzureBlobStorageAdapter > upload > called with fileName: ${fileName} and containerName: ${containerName}`,
    );
    const soundGifAzureBlobStorage = this.connect();
    const containerClient =
      soundGifAzureBlobStorage.getContainerClient(containerName);
    const blockBlobClient = containerClient.getBlockBlobClient(fileName);
    await blockBlobClient.upload(file, file.size);
    return blockBlobClient.url;
  }
}
