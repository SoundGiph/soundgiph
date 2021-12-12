import { CommandBus } from '@nestjs/cqrs';
import {
  UploadFileToAzureStoragePayload,
  UploadFileToAzureStorageCommand,
  UploadFileToAzureStorageCommandResult,
} from '../core/application/commands/upload-file-to-azure-storage/upload-file-to-azure-storage.command';

export class AzureStoragePresenter {
  constructor(public readonly commandBus: CommandBus) {}

  public async upload(
    payload: UploadFileToAzureStoragePayload,
  ): Promise<UploadFileToAzureStorageCommandResult> {
    const uploadedFileUrl = await this.commandBus.execute(
      new UploadFileToAzureStorageCommand(payload),
    );
    return new UploadFileToAzureStorageCommandResult(uploadedFileUrl);
  }
}
