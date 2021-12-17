import { IQuery, IQueryResult } from '@nestjs/cqrs';
import { SoundGifEntity } from '../../../domain/sound-gif.entity';

export type FindSoundGifPayload = {
  fulltext: string;
};
export class FindSoundGifQuery implements IQuery {
  constructor(public readonly payload: FindSoundGifPayload) {}
}

export class FindSoundGifQueryResult implements IQueryResult {
  constructor(public readonly soundGifs: SoundGifEntity[]) {}
}
