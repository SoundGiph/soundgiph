import { GetAllCategoriesWithSoundGifsQueryHandler } from "./get-all-categories-with-soundgifs.command-handler";

const SoundGifPort = {
  getAllCategoriesWithSoundGifs: jest.fn(),
};

describe("GetAllCategoriesWithSoundGifsQuery", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  const getAllCategoriesGifQueryHandler = new GetAllCategoriesWithSoundGifsQueryHandler(SoundGifPort);

  it("should call SoundGifPort, 1 time with no payload", async () => {
    await getAllCategoriesGifQueryHandler.execute();
    expect(SoundGifPort.getAllCategoriesWithSoundGifs).toHaveBeenCalledTimes(1);
  });
});
