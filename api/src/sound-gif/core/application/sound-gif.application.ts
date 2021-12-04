import { FindMostRecentSoundGifQueryHandler } from './queries/find-most-recent-sound-gif/find-most-recent-sound-gif.query-handler';
import { FindMostSharedSoundGifQueryHandler } from './queries/find-most-shared-sound-gif/find-most-shared-sound-gif.query-handler';
import { FindSoundGifQueryHandler } from './queries/find-sound-gif/find-sound-gif.query-handler';

const SoundGifQueryHandler = [
  FindSoundGifQueryHandler,
  FindMostRecentSoundGifQueryHandler,
  FindMostSharedSoundGifQueryHandler,
];

export const SoundGifApplications = [...SoundGifQueryHandler];
