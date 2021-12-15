import { ConfigService } from '@nestjs/config';
import { Blob } from 'buffer';
import { AzureBlobStoragePresenter } from '../../../../../azure-blob-storage/interface/azure-blob-storage.presenter';
import { CreateSoundGifCommand } from './create-sound-gif.command';
import { CreateSoundGifCommandHandler } from './create-sound-gif.command-handler';

const configService = new ConfigService();

const azureStoragePresenter = {
  upload: jest.fn(),
};

const createSoundGifPort = {
  create: jest.fn(),
};

const title = 'niska méchant';
const blob = new Blob([''], { type: 'text/html' });
blob['lastModifiedDate'] = '';
blob['name'] = title;

const payload = {
  title,
  audioFile: blob as unknown as Express.Multer.File,
  imageFile: blob as unknown as Express.Multer.File,
  containerName: 'images',
};

describe('createSoundGifCommand', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  const createSoundGifCommand = new CreateSoundGifCommand(payload);
  const createSoundGifCommandHandler = new CreateSoundGifCommandHandler(
    configService,
    createSoundGifPort,
    azureStoragePresenter as unknown as AzureBlobStoragePresenter,
  );

  it('should create a soundgif', async () => {
    await createSoundGifCommandHandler.execute(createSoundGifCommand);
    expect(createSoundGifPort.create).toHaveBeenCalledTimes(1);
  });
});
