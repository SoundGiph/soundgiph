import { IQuery, IQueryResult } from "@nestjs/cqrs";
import { SoundGifEntity } from "src/sound-gif/core/domain/sound-gif.entity";

export type CategoriesWithSoundGifs = { name: string; soundGifs: SoundGifEntity[] };

export class GetAllCategoriesWithSoundGifsQuery implements IQuery {}

export class GetAllCategoriesWithSoundGifsQueryResult implements IQueryResult {
  constructor(public readonly categoriesWithSoundgifs: CategoriesWithSoundGifs[]) {}
}
