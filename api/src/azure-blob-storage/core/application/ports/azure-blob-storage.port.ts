export abstract class AzureBlobStoragePort {
  abstract upload(
    file: File,
    fileName: string,
    containerName: string,
  ): Promise<string>;
}
