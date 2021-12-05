import { FindManyOptions } from 'typeorm';
import { SoundGifEntity } from '../../domain/sound-gif.entity';

export abstract class SoundGifPort {
  abstract find(whereOptions: FindManyOptions): Promise<SoundGifEntity[]>;
  abstract findMostRecent(): Promise<SoundGifEntity[]>;
  abstract findMostShared(): Promise<SoundGifEntity[]>;
}
