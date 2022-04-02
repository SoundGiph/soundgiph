import "multer";
export abstract class AzureBlobStoragePort {
  abstract upload(file: Express.Multer.File, containerName: string): Promise<string>;
}
