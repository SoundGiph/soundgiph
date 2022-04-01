import { IQuery, IQueryResult } from "@nestjs/cqrs";
import { SoundGifEntity } from "../../../domain/sound-gif.entity";

export class FindMostSharedSoundGifQuery implements IQuery {}

export class FindMostSharedSoundGifQueryResult implements IQueryResult {
  constructor(public readonly soundGifs: SoundGifEntity[]) {}
}
