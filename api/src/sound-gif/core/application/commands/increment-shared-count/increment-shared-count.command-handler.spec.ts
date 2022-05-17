import * as faker from "faker";
import { SoundGifEntity } from "src/sound-gif/core/domain/sound-gif.entity";
import { IncrementSharedCountCommand, IncrementSharedCountPayload } from "./increment-shared-count.command";
import { IncrementSharedCountCommandHandler } from "./increment-shared-count.command-handler";

const incrementSharedCountPort = {
    incrementSharedCount: jest.fn(),
};


const payload: IncrementSharedCountPayload = {
    id: faker.random.uuid() as SoundGifEntity["id"],
};

describe("createSoundGifCommand", () => {
    afterEach(() => {
        jest.clearAllMocks();
    });
    const incrementSharedCountCommand = new IncrementSharedCountCommand(payload);
    const incrementSharedCountCommandHandler = new IncrementSharedCountCommandHandler(incrementSharedCountPort);

    it("should create a soundgif", async () => {
        await incrementSharedCountCommandHandler.execute(incrementSharedCountCommand);
        expect(incrementSharedCountPort.incrementSharedCount).toHaveBeenCalledTimes(1);
    });
});
