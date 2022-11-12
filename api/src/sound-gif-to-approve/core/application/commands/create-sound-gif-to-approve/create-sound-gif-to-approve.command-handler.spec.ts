// import { Blob } from "buffer";
// import * as faker from "faker";
// import { UserEntity } from "src/user/core/domain/user.entity";
// import {
//   CreateSoundGifToApproveCommand,
//   CreateSoundGifToApprovePayload,
// } from "./create-sound-gif-to-approve.command";
// import { CreateSoundGifToApproveCommandHandler } from "./create-sound-gif-to-approve.command-handler";

// const createSoundGifPort = {
//   create: jest.fn(),
// };

// const title = "niska méchant";
// const blob = new Blob([""], { type: "text/html" });
// blob["lastModifiedDate"] = "";
// blob["name"] = title;

// const payload: CreateSoundGifToApprovePayload = {
//   title,
//   audioUrl: faker.internet.url(),
//   imageUrl: faker.internet.url(),
//   description: "niska",
//   addedBy: "userId" as UserEntity["id"],
// };

// describe("createSoundGifToApproveCommand", () => {
//   afterEach(() => {
//     jest.clearAllMocks();
//   });
//   const createSoundGifCommand = new CreateSoundGifToApproveCommand(payload);
//   const createSoundGifCommandHandler = new CreateSoundGifToApproveCommandHandler(
//     createSoundGifPort
//   );

//   it("should create a soundgif to approve", async () => {
//     await createSoundGifCommandHandler.execute(createSoundGifCommand);
//     expect(createSoundGifPort.create).toHaveBeenCalledTimes(1);
//   });
// });
