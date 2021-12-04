import * as faker from 'faker';
import * as uuid from 'uuid';
import { SoundGifEntity } from './sound-gif.entity';

export const soundGifFixtureFactory = (
  partialSoundGif: Partial<SoundGifEntity>,
): SoundGifEntity => {
  return Object.assign(new SoundGifEntity(), {
    id: uuid.v4(),
    personalityName: `${faker.name.findName()} ${faker.name.lastName()}`,
    description: faker.random.words(),
    audioTitle: faker.name.title(),
    audioUrl: faker.internet.url(),
    imageUrl: faker.internet.url(),
    ...partialSoundGif,
  }) as SoundGifEntity;
};
