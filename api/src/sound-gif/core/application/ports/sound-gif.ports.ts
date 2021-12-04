import { SoundGifEntity } from '../../domain/sound-gif.entity';

export abstract class SoundGifPort {
  abstract find(fulltext: string): Promise<SoundGifEntity[]>;
  abstract findMostRecent(): Promise<SoundGifEntity[]>;
}
