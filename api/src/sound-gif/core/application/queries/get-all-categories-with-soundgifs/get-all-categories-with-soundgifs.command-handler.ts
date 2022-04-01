import { Inject } from "@nestjs/common";
import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { SoundGifEntity } from "../../../domain/sound-gif.entity";
import { SoundGifPort } from "../../ports/sound-gif.ports";
import {
  GetAllCategoriesWithSoundgifsQuery,
  GetAllCategoriesWithSoundgifsQueryResult,
} from "./get-all-categories-with-soundgifs.command";

@QueryHandler(GetAllCategoriesWithSoundgifsQuery)
export class GetAllCategoriesWithSoundgifsQueryHandler implements IQueryHandler<GetAllCategoriesWithSoundgifsQuery> {
  constructor(
    @Inject(SoundGifEntity)
    private readonly SoundGifPort: Pick<SoundGifPort, "getAllCategoriesWithSoundGifs">
  ) {}

  public async execute(): Promise<GetAllCategoriesWithSoundgifsQueryResult> {
    const categoriesWithSoundgifs = await this.SoundGifPort.getAllCategoriesWithSoundGifs();
    return new GetAllCategoriesWithSoundgifsQueryResult(categoriesWithSoundgifs);
  }
}
