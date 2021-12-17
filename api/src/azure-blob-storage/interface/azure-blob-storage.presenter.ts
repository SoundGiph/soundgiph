import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import {
  UploadFileToAzureStorageCommand,
  UploadFileToAzureStorageCommandResult,
} from '../core/application/commands/upload-file-to-azure-storage/upload-file-to-azure-storage.command';

@Injectable()
export class AzureBlobStoragePresenter {
  constructor(private readonly commandBus: CommandBus) {}

  public async upload(
    file: Express.Multer.File,
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
