import { FindManyOptions, FindOneOptions } from 'typeorm';
import {
  SoundGifEntity,
  SoundGifEntityMandatoryFields,
} from '../../domain/sound-gif.entity';

export abstract class SoundGifPort {
  abstract find(whereOptions: FindManyOptions): Promise<SoundGifEntity[]>;
  abstract getOne(whereOptions: FindOneOptions): Promise<SoundGifEntity>;
  abstract findMostRecent(): Promise<SoundGifEntity[]>;
  abstract findMostShared(): Promise<SoundGifEntity[]>;
  abstract create(
    payload: Partial<SoundGifEntity> & SoundGifEntityMandatoryFields,
  ): Promise<SoundGifEntity>;
}
