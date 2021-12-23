import { IQuery, IQueryResult } from '@nestjs/cqrs';
import { SoundGifEntity } from '../../../domain/sound-gif.entity';

export type FindOneSoundGifPayload = {
  id: SoundGifEntity['id'];
};
export class FindOneSoundGifQuery implements IQuery {
  constructor(public readonly payload: FindOneSoundGifPayload) {}
}

export class FindOneSoundGifQueryResult implements IQueryResult {
  constructor(public readonly soundGif: SoundGifEntity) {}
}
