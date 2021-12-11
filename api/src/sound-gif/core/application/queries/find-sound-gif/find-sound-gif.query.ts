import { IQuery, IQueryResult } from '@nestjs/cqrs';
import { SoundGifEntity } from '../../../domain/sound-gif.entity';

export type FindDTO = {
  fulltext: string;
};
export class FindSoundGifQuery implements IQuery {
  constructor(public readonly payload: { fulltext: string }) {}
}

export class FindMostSharedSoundGifQueryResult implements IQueryResult {
  constructor(public readonly soundGifs: SoundGifEntity[]) {}
}
