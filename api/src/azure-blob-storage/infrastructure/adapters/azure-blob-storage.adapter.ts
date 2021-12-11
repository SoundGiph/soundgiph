import { BlobServiceClient } from '@azure/storage-blob';
import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AZURE_BLOB_STORAGE_NO_CREDENTIALS } from '../../../common/errors/errors-constants';
import { AzureBlobStoragePort } from '../../core/application/ports/azure-blob-storage.port';

export class AzureBlobStorageAdapter implements AzureBlobStoragePort {
  constructor(
    public readonly configService: ConfigService,
    public readonly blobServiceClient: BlobServiceClient,
  ) {}
  private readonly logger = new Logger();

  private async connect(): Promise<BlobServiceClient> | undefined {
    try {
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
    } catch (error) {
      return undefined;
    }
  }

  public async upload(
    file: File,
    fileName: string,
    containerName: string,
  ): Promise<string | undefined> {
    try {
      this.logger.log(
        `AzureBlobStorageAdapter > upload > called with fileName: ${fileName} and containerName: ${containerName}`,
      );
      const soundGifAzureBlobStorage = await this.connect();
      const containerClient =
        soundGifAzureBlobStorage.getContainerClient(containerName);
      const blobName = fileName + new Date().getTime();
      const blockBlobClient = containerClient.getBlockBlobClient(blobName);
      const uploadBlobResponse = await blockBlobClient.upload(file, file.size);
      if (Boolean(uploadBlobResponse._response.status !== 200))
        return undefined;
      return blockBlobClient.url;
    } catch (error) {
      this.logger.error(
        `AzureBlobStorageAdapter > upload > failed with fileName: ${fileName} and containerName: ${containerName} returned error: ${error}`,
      );
      return undefined;
    }
  }
}
