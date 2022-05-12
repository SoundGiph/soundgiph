import { Inject } from "@nestjs/common";
import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { SoundGifEntity } from "../../../domain/sound-gif.entity";
import { SoundGifPort } from "../../ports/sound-gif.ports";
import {
  GetAllCategoriesWithSoundGifsQuery,
  GetAllCategoriesWithSoundGifsQueryResult,
} from "./get-all-categories-with-soundgifs.command";

const DEFAULT_LIMIT_OF_VOZO_BY_CATEGORIES = 20;
@QueryHandler(GetAllCategoriesWithSoundGifsQuery)
export class GetAllCategoriesWithSoundGifsQueryHandler
  implements IQueryHandler<GetAllCategoriesWithSoundGifsQuery>
{
  constructor(
    @Inject(SoundGifEntity)
    private readonly SoundGifPort: Pick<SoundGifPort, "getAllCategories" | "find">
  ) {}

  public async execute(): Promise<GetAllCategoriesWithSoundGifsQueryResult> {
    const categories = await this.SoundGifPort.getAllCategories();
    const limit = DEFAULT_LIMIT_OF_VOZO_BY_CATEGORIES;
    const mostSharedSoundGifs = await this.SoundGifPort.find({
      filters: { mostShared: true, limit },
    });
    const mostRecentSoundGifs = await this.SoundGifPort.find({
      filters: { mostRecent: true, limit },
    });
    const categoriesWithSoundgifs = await Promise.all(
      categories.map(async category => {
        return {
          name: category,
          soundGifs: await this.SoundGifPort.find({
            filters: { category, limit },
          }),
        };
      })
    );
    categoriesWithSoundgifs.unshift(
      { name: "mostRecent", soundGifs: mostRecentSoundGifs },
      { name: "mostShared", soundGifs: mostSharedSoundGifs }
    );
    return new GetAllCategoriesWithSoundGifsQueryResult(categoriesWithSoundgifs);
  }
}
