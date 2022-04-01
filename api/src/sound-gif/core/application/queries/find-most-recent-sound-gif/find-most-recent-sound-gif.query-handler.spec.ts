import { FindMostRecentSoundGifQueryHandler } from "./find-most-recent-sound-gif.query-handler";

const SoundGifPort = {
  findMostRecent: jest.fn(),
};

describe("FindSoundGifQuery", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  const findMostRecentSoundGifQueryHandler = new FindMostRecentSoundGifQueryHandler(SoundGifPort);

  it("should call SoundGifPort, 1 time with fulltext", async () => {
    await findMostRecentSoundGifQueryHandler.execute();
    expect(SoundGifPort.findMostRecent).toHaveBeenCalledTimes(1);
  });
});
