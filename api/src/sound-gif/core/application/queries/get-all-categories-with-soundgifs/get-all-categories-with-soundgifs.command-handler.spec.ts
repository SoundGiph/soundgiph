import { Categories } from "../../../domain/sound-gif.entity";
import { GetAllCategoriesWithSoundGifsQueryHandler } from "./get-all-categories-with-soundgifs.command-handler";

const SoundGifPort = {
  find: jest.fn(),
  getAllCategories: jest.fn(),
};

describe("GetAllCategoriesWithSoundGifsQuery", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  const getAllCategoriesGifQueryHandler = new GetAllCategoriesWithSoundGifsQueryHandler(
    SoundGifPort
  );

  it("should call SoundGifPort, 1 time with no payload", async () => {
    jest.spyOn(SoundGifPort, "getAllCategories").mockResolvedValue(Object.values(Categories));
    await getAllCategoriesGifQueryHandler.execute();
    expect(SoundGifPort.find).toHaveBeenCalledTimes(13);
    expect(SoundGifPort.getAllCategories).toHaveBeenCalledTimes(1);
  });
});
