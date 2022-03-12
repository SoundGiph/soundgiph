import { GetAllCategoriesQueryHandler } from "./get-all-categories.query-handler";

const SoundGifPort = {
  getAllCategories: jest.fn(),
};

describe("GetAllCategoriesQuery", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  const getAllCategoriesGifQueryHandler = new GetAllCategoriesQueryHandler(SoundGifPort);

  it("should call SoundGifPort, 1 time with no payload", async () => {
    await getAllCategoriesGifQueryHandler.execute();
    expect(SoundGifPort.getAllCategories).toHaveBeenCalledTimes(1);
  });
});
