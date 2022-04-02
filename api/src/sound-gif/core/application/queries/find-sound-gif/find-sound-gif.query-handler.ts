import { Inject } from "@nestjs/common";
import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { SoundGifEntity } from "../../../domain/sound-gif.entity";
import { SoundGifPort } from "../../ports/sound-gif.ports";
import { FindSoundGifQuery, FindSoundGifQueryResult } from "./find-sound-gif.query";

@QueryHandler(FindSoundGifQuery)
export class FindSoundGifQueryHandler implements IQueryHandler<FindSoundGifQuery> {
  constructor(
    @Inject(SoundGifEntity)
    private readonly findSoundGifPort: Pick<SoundGifPort, "find">
  ) {}

  public async execute({ payload }: FindSoundGifQuery): Promise<FindSoundGifQueryResult> {
    const soundGifs = await this.findSoundGifPort.find(payload);
    return new FindSoundGifQueryResult(soundGifs);
  }
}
