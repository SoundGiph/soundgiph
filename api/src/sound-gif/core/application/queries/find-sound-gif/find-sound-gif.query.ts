import { IQuery, IQueryResult } from '@nestjs/cqrs';
import { SoundGifEntity } from '../../../domain/sound-gif.entity';

export type FindSoundGifPayload = {
  fulltext: string;
};
export class FindSoundGifQuery implements IQuery {
  constructor(public readonly payload: FindSoundGifPayload) {}
}

export class FindMostSharedSoundGifQueryResult implements IQueryResult {
  constructor(public readonly soundGifs: SoundGifEntity[]) {}
}
