import { Inject, Logger } from "@nestjs/common";
import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { SoundGifEntity } from "../../../domain/sound-gif.entity";
import { SoundGifPort } from "../../ports/sound-gif.ports";
import { FindSoundGifQuery, FindSoundGifQueryResult } from "./find-sound-gif.query";

const DEFAULT_LIMIT_OF_VOZO_BY_CATEGORY = 50;
@QueryHandler(FindSoundGifQuery)
export class FindSoundGifQueryHandler implements IQueryHandler<FindSoundGifQuery> {
  private readonly logger = new Logger();
  constructor(
    @Inject(SoundGifEntity)
    private readonly findSoundGifPort: Pick<SoundGifPort, "find">
  ) {}

  public async execute({ payload }: FindSoundGifQuery): Promise<FindSoundGifQueryResult> {
    const { fulltext, filters } = payload;
    const limit = DEFAULT_LIMIT_OF_VOZO_BY_CATEGORY;
    this.logger.log(
      `FindSoundGifQueryHandler > called with fulltext: ${fulltext} and filters: ${filters}`
    );
    const soundGifs = await this.findSoundGifPort.find({
      filters: { ...filters, limit },
      fulltext,
    });
    return new FindSoundGifQueryResult(soundGifs);
  }
}
