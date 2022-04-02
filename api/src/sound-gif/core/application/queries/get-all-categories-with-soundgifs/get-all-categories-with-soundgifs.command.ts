import { IQuery, IQueryResult } from "@nestjs/cqrs";
import { SoundGifEntity } from "src/sound-gif/core/domain/sound-gif.entity";

export type CategoriesWithSoundgifs = { [key: string]: SoundGifEntity[] };

export class GetAllCategoriesWithSoundGifsQuery implements IQuery {}

export class GetAllCategoriesWithSoundGifsQueryResult implements IQueryResult {
  constructor(public readonly categoriesWithSoundgifs: CategoriesWithSoundgifs[]) {}
}
