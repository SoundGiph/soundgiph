import { FindOneSoundGifQuery } from './find-one-sound-gif.query';
import { FindOneSoundGifQueryHandler } from './find-one-sound-gif.query-handler';

const SoundGifPort = {
  findOne: jest.fn(),
};

const payload = {
  id: '1',
};

describe('FindOneSoundGifQuery', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  const findOneSoundGifQuery = new FindOneSoundGifQuery(payload);
  const findOneSoundGifQueryHandler = new FindOneSoundGifQueryHandler(
    SoundGifPort,
  );

  it('should call SoundGifPort, 1 time with fulltext', async () => {
    await findOneSoundGifQueryHandler.execute(findOneSoundGifQuery);
    expect(SoundGifPort.findOne).toHaveBeenCalledTimes(1);
  });
});
