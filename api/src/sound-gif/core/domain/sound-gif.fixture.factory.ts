import * as faker from "faker";
import * as uuid from "uuid";
import { Categories, SoundGifEntity } from "./sound-gif.entity";

export const soundGifFixtureFactory = (
  partialSoundGif: Partial<SoundGifEntity>
): SoundGifEntity => {
  return Object.assign(new SoundGifEntity(), {
    id: uuid.v4(),
    tags: [faker.random.word(), faker.random.word()],
    description: faker.random.words(),
    title: faker.name.title(),
    categories: [Categories.TV],
    reactions: [faker.random.words(), faker.random.words()],
    audioUrl: "https://soundgiph.blob.core.windows.net/sounds/AlkpotePute.mp3",
    imageUrl: "https://soundgiph.blob.core.windows.net/sounds/AlkpotePute.png",
    ...partialSoundGif,
  }) as SoundGifEntity;
};
