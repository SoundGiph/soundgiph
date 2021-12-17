import { ConfigService } from '@nestjs/config';
import { Blob } from 'buffer';
import * as faker from 'faker';
import { CreateSoundGifCommand } from './create-sound-gif.command';
import { CreateSoundGifCommandHandler } from './create-sound-gif.command-handler';

const configService = new ConfigService();

const createSoundGifPort = {
  create: jest.fn(),
};

const title = 'niska méchant';
const blob = new Blob([''], { type: 'text/html' });
blob['lastModifiedDate'] = '';
blob['name'] = title;

const payload = {
  title,
  audioUrl: faker.internet.url(),
  imageUrl: faker.internet.url(),
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
  );

  it('should create a soundgif', async () => {
    await createSoundGifCommandHandler.execute(createSoundGifCommand);
    expect(createSoundGifPort.create).toHaveBeenCalledTimes(1);
  });
});
