import { IQuery } from '@nestjs/cqrs';

export class FindSoundGifQuery implements IQuery {
  constructor(public readonly payload: { fulltext: string }) {}
}
