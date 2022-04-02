import { CreateSoundGifCommandHandler } from "./commands/create-sound-gif/create-sound-gif.command-handler";
import { FindSoundGifQueryHandler } from "./queries/find-sound-gif/find-sound-gif.query-handler";
import { GetAllCategoriesWithSoundgifsQueryHandler } from "./queries/get-all-categories-with-soundgifs/get-all-categories-with-soundgifs.command-handler";
import { GetAllCategoriesQueryHandler } from "./queries/get-all-categories/get-all-categories.query-handler";

const SoundGifQueryHandler = [
  FindSoundGifQueryHandler,
  GetAllCategoriesQueryHandler,
  GetAllCategoriesWithSoundgifsQueryHandler,
];

const SoundGifCommandHandler = [CreateSoundGifCommandHandler];

export const SoundGifApplications = [...SoundGifQueryHandler, ...SoundGifCommandHandler];
