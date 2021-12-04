import { FindSoundGifQuery } from './find-sound-gif.query';
import { FindSoundGifQueryHandler } from './find-sound-gif.query-handler';

const SoundGifPort = {
  find: jest.fn(),
};

const payload = {
  fulltext: 'keyword',
};

describe('FindSoundGifQuery', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  const findSoundGifQuery = new FindSoundGifQuery(payload);
  const findSoundGifQueryHandler = new FindSoundGifQueryHandler(SoundGifPort);

  it('should call SoundGifPort, 1 time with fulltext', async () => {
    await findSoundGifQueryHandler.execute(findSoundGifQuery);
    expect(SoundGifPort.find).toHaveBeenNthCalledWith(1, payload.fulltext);
  });
});
