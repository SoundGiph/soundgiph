import { ICommand } from '@nestjs/cqrs';

export type UploadFileToAzureStoragePayload = {
  file: Express.Multer.File;
  containerName: string;
};

export class UploadFileToAzureStorageCommand implements ICommand {
  constructor(public readonly payload: UploadFileToAzureStoragePayload) {}
}

export class UploadFileToAzureStorageCommandResult {
  constructor(public readonly fileUrl: string) {}
}
