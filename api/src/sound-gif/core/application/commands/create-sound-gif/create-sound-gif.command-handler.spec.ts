import { Blob } from "buffer";
import * as faker from "faker";
import { UserEntity } from "src/user/core/domain/user.entity";
import { CreateSoundGifCommand, CreateSoundGifPayload } from "./create-sound-gif.command";
import { CreateSoundGifCommandHandler } from "./create-sound-gif.command-handler";

const createSoundGifPort = {
  create: jest.fn(),
};

const title = "niska méchant";
const blob = new Blob([""], { type: "text/html" });
blob["lastModifiedDate"] = "";
blob["name"] = title;

const payload: CreateSoundGifPayload = {
  title,
  audioUrl: faker.internet.url(),
  imageUrl: faker.internet.url(),
  tags: [],
  description: "niska",
  reactions: [],
  categories: [],
  userId: "userId" as UserEntity["id"],
};

describe("createSoundGifCommand", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  const createSoundGifCommand = new CreateSoundGifCommand(payload);
  const createSoundGifCommandHandler = new CreateSoundGifCommandHandler(createSoundGifPort);

  it("should create a soundgif", async () => {
    await createSoundGifCommandHandler.execute(createSoundGifCommand);
    expect(createSoundGifPort.create).toHaveBeenCalledTimes(1);
  });
});
