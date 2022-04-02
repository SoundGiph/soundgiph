import { FindMostSharedSoundGifQueryHandler } from './find-most-shared-sound-gif.query-handler';

const SoundGifPort = {
  findMostShared: jest.fn(),
};

describe('FindSoundGifQuery', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  const findMostSharedSoundGifQueryHandler =
    new FindMostSharedSoundGifQueryHandler(SoundGifPort);

  it('should call SoundGifPort, 1 time with fulltext', async () => {
    await findMostSharedSoundGifQueryHandler.execute();
    expect(SoundGifPort.findMostShared).toHaveBeenCalledTimes(1);
  });
});
