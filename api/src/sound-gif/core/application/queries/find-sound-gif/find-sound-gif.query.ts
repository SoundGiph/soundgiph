import { IQuery } from '@nestjs/cqrs';

export type FindDTO = {
  fulltext: string;
};
export class FindSoundGifQuery implements IQuery {
  constructor(public readonly payload: { fulltext: string }) {}
}
