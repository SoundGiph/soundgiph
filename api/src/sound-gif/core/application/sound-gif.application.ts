import { CreateSoundGifCommandHandler } from "./commands/create-sound-gif/create-sound-gif.command-handler";
import { FindMostRecentSoundGifQueryHandler } from "./queries/find-most-recent-sound-gif/find-most-recent-sound-gif.query-handler";
import { FindMostSharedSoundGifQueryHandler } from "./queries/find-most-shared-sound-gif/find-most-shared-sound-gif.query-handler";
import { GetOneSoundGifQueryHandler } from "./queries/find-one-sound-gif/find-one-sound-gif.query-handler";
import { FindSoundGifQueryHandler } from "./queries/find-sound-gif/find-sound-gif.query-handler";
import { GetAllCategoriesWithSoundgifsQueryHandler } from "./queries/get-all-categories-with-soundgifs/get-all-categories-with-soundgifs.command-handler";
import { GetAllCategoriesQueryHandler } from "./queries/get-all-categories/get-all-categories.query-handler";

const SoundGifQueryHandler = [
  GetOneSoundGifQueryHandler,
  FindSoundGifQueryHandler,
  FindMostRecentSoundGifQueryHandler,
  FindMostSharedSoundGifQueryHandler,
  GetAllCategoriesQueryHandler,
  GetAllCategoriesWithSoundgifsQueryHandler,
];

const SoundGifCommandHandler = [CreateSoundGifCommandHandler];

export const SoundGifApplications = [...SoundGifQueryHandler, ...SoundGifCommandHandler];
