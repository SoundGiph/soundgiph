import { IQuery, IQueryResult } from "@nestjs/cqrs";
import { SoundGifEntity } from "../../../domain/sound-gif.entity";

export interface SearchFilter {
  category?: string;
  reaction?: string;
  mostShared?: boolean;
  mostRecent?: boolean;
  limit?: number;
}

export type FindSoundGifPayload = {
  fulltext?: string;
  filters?: SearchFilter;
};

export class FindSoundGifQuery implements IQuery {
  constructor(public readonly payload: FindSoundGifPayload) {}
}

export class FindSoundGifQueryResult implements IQueryResult {
  constructor(public readonly soundGifs: SoundGifEntity[]) {}
}
