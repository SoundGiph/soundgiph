import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { AzureBlobStoragePort } from '../../ports/azure-blob-storage.port';
import {
  UploadFileToAzureStorageCommand,
  UploadFileToAzureStorageCommandResult,
} from './upload-file-to-azure-storage.command';

@QueryHandler(UploadFileToAzureStorageCommand)
export class UploadFileToAzureStorageCommandHandler
  implements IQueryHandler<UploadFileToAzureStorageCommand>
{
  constructor(private readonly azureBlobStoragePort: AzureBlobStoragePort) {}

  public async execute({
    payload,
  }: UploadFileToAzureStorageCommand): Promise<UploadFileToAzureStorageCommandResult> {
    const { file, fileName, containerName } = payload;
    const blobName = fileName + new Date().getTime();
    const uploadedFileUrl = await this.azureBlobStoragePort.upload(
      file,
      blobName,
      containerName,
    );
    return new UploadFileToAzureStorageCommandResult(uploadedFileUrl);
  }
}
