import { Inject } from "@nestjs/common";
import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { SoundGifEntity } from "../../../domain/sound-gif.entity";
import { SoundGifPort } from "../../ports/sound-gif.ports";
import { FindMostRecentSoundGifQuery, FindMostRecentSoundGifQueryResult } from "./find-most-recent-sound-gif.query";

@QueryHandler(FindMostRecentSoundGifQuery)
export class FindMostRecentSoundGifQueryHandler implements IQueryHandler<FindMostRecentSoundGifQuery> {
  constructor(
    @Inject(SoundGifEntity)
    private readonly findSoundGifPort: Pick<SoundGifPort, "findMostRecent">
  ) {}

  public async execute(): Promise<FindMostRecentSoundGifQueryResult> {
    const soundGifs = await this.findSoundGifPort.findMostRecent();
    return new FindMostRecentSoundGifQueryResult(soundGifs);
  }
}
