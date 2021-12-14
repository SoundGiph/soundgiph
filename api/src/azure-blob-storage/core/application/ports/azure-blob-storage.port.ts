export abstract class AzureBlobStoragePort {
  abstract upload(
    file: Express.Multer.File,
    fileName: string,
    containerName: string,
  ): Promise<string>;
}
