import { FindMostRecentSoundGifQuery } from './queries/find-most-recent-sound-gif/find-most-recent-sound-gif.query';
import { FindMostSharedSoundGifQuery } from './queries/find-most-shared-sound-gif/find-most-shared-sound-gif.query';
import { FindSoundGifQuery } from './queries/find-sound-gif/find-sound-gif.query';

const SoundGifQueryHandler = [
  FindSoundGifQuery,
  FindMostRecentSoundGifQuery,
  FindMostSharedSoundGifQuery,
];

export const SoundGifApplications = [...SoundGifQueryHandler];
