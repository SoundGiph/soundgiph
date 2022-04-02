import { SoundGifEntity } from 'src/sound-gif/core/domain/sound-gif.entity';
import { GetOneSoundGifQuery } from './find-one-sound-gif.query';
import { GetOneSoundGifQueryHandler } from './find-one-sound-gif.query-handler';

const SoundGifPort = {
  getOne: jest.fn(),
};

const payload = {
  id: '1' as SoundGifEntity['id'],
};

describe('GetOneSoundGifQuery', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  const getOneSoundGifQuery = new GetOneSoundGifQuery(payload);
  const getOneSoundGifQueryHandler = new GetOneSoundGifQueryHandler(
    SoundGifPort,
  );

  it('should call SoundGifPort, 1 time with fulltext', async () => {
    await getOneSoundGifQueryHandler.execute(getOneSoundGifQuery);
    expect(SoundGifPort.getOne).toHaveBeenCalledTimes(1);
  });
});
