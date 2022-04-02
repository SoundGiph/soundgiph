import { Inject } from "@nestjs/common";
import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { SoundGifEntity } from "../../../domain/sound-gif.entity";
import { SoundGifPort } from "../../ports/sound-gif.ports";
import {
  GetAllCategoriesWithSoundGifsQuery,
  GetAllCategoriesWithSoundGifsQueryResult,
} from "./get-all-categories-with-soundgifs.command";

@QueryHandler(GetAllCategoriesWithSoundGifsQuery)
export class GetAllCategoriesWithSoundGifsQueryHandler implements IQueryHandler<GetAllCategoriesWithSoundGifsQuery> {
  constructor(
    @Inject(SoundGifEntity)
    private readonly SoundGifPort: Pick<SoundGifPort, "getAllCategoriesWithSoundGifs">
  ) {}

  public async execute(): Promise<GetAllCategoriesWithSoundGifsQueryResult> {
    const categoriesWithSoundgifs = await this.SoundGifPort.getAllCategoriesWithSoundGifs();
    return new GetAllCategoriesWithSoundGifsQueryResult(categoriesWithSoundgifs);
  }
}
