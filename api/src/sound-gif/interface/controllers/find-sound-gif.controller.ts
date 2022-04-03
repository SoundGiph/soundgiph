import { Body, Controller, Get, Post } from "@nestjs/common";
import { QueryBus } from "@nestjs/cqrs";
import "multer";
import {
  FindSoundGifPayload,
  FindSoundGifQuery,
  FindSoundGifQueryResult,
} from "../../core/application/queries/find-sound-gif/find-sound-gif.query";
import {
  CategoriesWithSoundGifs,
  GetAllCategoriesWithSoundGifsQuery,
  GetAllCategoriesWithSoundGifsQueryResult,
} from "../../core/application/queries/get-all-categories-with-soundgifs/get-all-categories-with-soundgifs.command";
import {
  GetAllCategoriesQuery,
  GetAllCategoriesQueryResult,
} from "../../core/application/queries/get-all-categories/get-all-categories.query";
import { SoundGifEntity } from "../../core/domain/sound-gif.entity";
@Controller()
export class FindSoundGifController {
  constructor(private readonly queryBus: QueryBus) {}

  @Post("/findSoundGif")
  async find(@Body() payload: FindSoundGifPayload): Promise<SoundGifEntity[]> {
    const { fulltext, filters } = payload;
    const { soundGifs } = await this.queryBus.execute<FindSoundGifQuery, FindSoundGifQueryResult>(
      new FindSoundGifQuery({
        fulltext,
        filters,
      })
    );
    return soundGifs;
  }

  @Get("/getAllCategories")
  async getAllCategories(): Promise<string[]> {
    const { categories } = await this.queryBus.execute<GetAllCategoriesQuery, GetAllCategoriesQueryResult>(
      new GetAllCategoriesQuery()
    );
    return categories;
  }

  @Get("/getAllCategoriesWithSoundGifs")
  async getAllCategoriesWithSoundgifs(): Promise<CategoriesWithSoundGifs[]> {
    const { categoriesWithSoundgifs } = await this.queryBus.execute<
      GetAllCategoriesWithSoundGifsQuery,
      GetAllCategoriesWithSoundGifsQueryResult
    >(new GetAllCategoriesWithSoundGifsQuery());
    return categoriesWithSoundgifs;
  }
}
