import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { AzureBlobStoragePort } from '../../ports/azure-blob-storage.port';
import {
  UploadFileToAzureStorageCommand,
  UploadFileToAzureStorageCommandResult,
} from './upload-file-to-azure-storage.command';

@CommandHandler(UploadFileToAzureStorageCommand)
export class UploadFileToAzureStorageCommandHandler
  implements ICommandHandler<UploadFileToAzureStorageCommand>
{
  constructor(private readonly azureBlobStoragePort: AzureBlobStoragePort) {}

  public async execute({
    payload,
  }: UploadFileToAzureStorageCommand): Promise<UploadFileToAzureStorageCommandResult> {
    const { file, containerName } = payload;
    console.log('=================');
    console.log(file);
    console.log('=================');
    const uploadedFileUrl = await this.azureBlobStoragePort.upload(
      file,
      containerName,
    );
    return new UploadFileToAzureStorageCommandResult(uploadedFileUrl);
  }
}
