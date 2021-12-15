import { BlobServiceClient, ContainerClient } from '@azure/storage-blob';
import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AZURE_BLOB_STORAGE_NO_CREDENTIALS } from '../../common/errors/errors-constants';
import { AzureBlobStoragePort } from '../core/application/ports/azure-blob-storage.port';

const TEST_ENVIRONMENT = 'test';
export class AzureBlobStorageAdapter implements AzureBlobStoragePort {
  constructor(private readonly configService: ConfigService) {}
  private readonly logger = new Logger();

  private connect(containerName: string): ContainerClient {
    this.logger.log(`AzureBlobStorageAdapter > connect > start`);
    const AZURE_STORAGE_URL = this.configService.get<string>(
      'AZURE_STORAGE_URL',
      '',
    );
    if (!AZURE_STORAGE_URL) throw new Error(AZURE_BLOB_STORAGE_NO_CREDENTIALS);

    const ENV = this.configService.get<string>('ENV', 'development');
    if (ENV === TEST_ENVIRONMENT) {
      containerName = `${containerName}-test`;
    }
    const soundGifAzureBlobStorage =
      BlobServiceClient.fromConnectionString(AZURE_STORAGE_URL);
    const containerClient =
      soundGifAzureBlobStorage.getContainerClient(containerName);
    return containerClient;
  }

  public async upload(
    file: Express.Multer.File,
    fileName: string,
    containerName: string,
  ): Promise<string> {
    this.logger.log(
      `AzureBlobStorageAdapter > upload > called with fileName: ${fileName} and containerName: ${containerName}`,
    );
    const blob = new Blob([file.buffer]);
    const containerClient = this.connect(containerName);
    const blockBlobClient = containerClient.getBlockBlobClient(fileName);
    await blockBlobClient.uploadData(blob);
    return blockBlobClient.url;
  }
}
