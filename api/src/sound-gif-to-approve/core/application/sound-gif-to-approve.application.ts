import { CreateSoundGifToApproveCommandHandler } from "./commands/create-sound-gif-to-approve/create-sound-gif-to-approve.command-handler";

const soundGifToApproveQueryHandlers = [];
const soundGifToApproveCommandHandlers = [CreateSoundGifToApproveCommandHandler];

export const soundGifToApproveApplications = [
  ...soundGifToApproveQueryHandlers,
  ...soundGifToApproveCommandHandlers,
];
