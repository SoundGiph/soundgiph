import { Injectable, Logger } from "@nestjs/common";
import { CommandBus } from "@nestjs/cqrs";
import {
  UploadFileToAzureStorageCommand,
  UploadFileToAzureStorageCommandResult,
} from "../core/application/commands/upload-file-to-azure-storage/upload-file-to-azure-storage.command";

@Injectable()
export class AzureBlobStoragePresenter {
  logger = new Logger();
  constructor(private readonly commandBus: CommandBus) { }

  public async upload(file: Express.Multer.File, containerName: string): Promise<string> {
    try {
      const { fileUrl } = await this.commandBus.execute<
        UploadFileToAzureStorageCommand,
        UploadFileToAzureStorageCommandResult
      >(new UploadFileToAzureStorageCommand({ file, containerName }));
      this.logger.log(`AzureBlobStoragePresenter > upload > fileUrl > ${fileUrl}`);
      return fileUrl;
    } catch (error) {
      this.logger.error(`AzureBlobStoragePresenter > upload > error > ${error}`);
      throw error;
    }
  }
}

