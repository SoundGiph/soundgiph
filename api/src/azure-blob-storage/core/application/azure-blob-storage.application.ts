import { UploadFileToAzureStorageCommandHandler } from './commands/upload-file-to-azure-storage/upload-file-to-azure-storage.command-handler';

const AzureBlobStorageCommandHandler = [UploadFileToAzureStorageCommandHandler];

export const AzureBlobStorageApplications = [...AzureBlobStorageCommandHandler];
