import { Blob } from 'buffer';
import { UploadFileToAzureStorageCommand } from './upload-file-to-azure-storage.command';
import { UploadFileToAzureStorageCommandHandler } from './upload-file-to-azure-storage.command-handler';

const AzureStoragePort = {
  upload: jest.fn(),
};

const fileName = 'niska méchant';
const blob = new Blob([''], { type: 'text/html' });
blob['lastModifiedDate'] = '';
blob['name'] = fileName;

const payload = {
  file: <File>blob,
  fileName,
  containerName: 'images',
};

describe('uploadFileToAzureStorage', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  const uploadFileToAzureStorageQuery = new UploadFileToAzureStorageCommand(
    payload,
  );
  const uploadFileToAzureStorageQueryHandler =
    new UploadFileToAzureStorageCommandHandler(AzureStoragePort);

  it('should upload file to azure storage and call the port one time', async () => {
    await uploadFileToAzureStorageQueryHandler.execute(
      uploadFileToAzureStorageQuery,
    );
    expect(AzureStoragePort.upload).toHaveBeenCalledTimes(1);
  });
});
