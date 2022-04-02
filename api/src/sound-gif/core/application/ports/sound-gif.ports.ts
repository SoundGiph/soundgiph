import { FindOneOptions } from 'typeorm';
import {
  SoundGifEntity,
  SoundGifEntityMandatoryFields,
} from '../../domain/sound-gif.entity';
import { FindSoundGifPayload } from '../queries/find-sound-gif/find-sound-gif.query';

export abstract class SoundGifPort {
  abstract find(payload: FindSoundGifPayload): Promise<SoundGifEntity[]>;
  abstract getOne(whereOptions: FindOneOptions): Promise<SoundGifEntity>;
  abstract findMostRecent(): Promise<SoundGifEntity[]>;
  abstract findMostShared(): Promise<SoundGifEntity[]>;
  abstract create(
    payload: Partial<SoundGifEntity> & SoundGifEntityMandatoryFields,
  ): Promise<SoundGifEntity>;
}
