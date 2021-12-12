import { CommandBus } from '@nestjs/cqrs';
import {
  UploadFileToAzureStorageCommand,
  UploadFileToAzureStorageCommandResult,
} from '../core/application/commands/upload-file-to-azure-storage/upload-file-to-azure-storage.command';

export class AzureStoragePresenter {
  constructor(public readonly commandBus: CommandBus) {}

  public async upload(
    file: File,
    fileName: string,
    containerName: string,
  ): Promise<string> {
    const { fileUrl } = await this.commandBus.execute<
      UploadFileToAzureStorageCommand,
      UploadFileToAzureStorageCommandResult
    >(new UploadFileToAzureStorageCommand({ file, fileName, containerName }));
    return fileUrl;
  }
}
