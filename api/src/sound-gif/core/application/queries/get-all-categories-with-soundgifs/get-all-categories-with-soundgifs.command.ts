import { IQuery, IQueryResult } from "@nestjs/cqrs";
import { SoundGifEntity } from "src/sound-gif/core/domain/sound-gif.entity";

export type CategoriesWithSoundgifs = { [key: string]: SoundGifEntity[] };

export class GetAllCategoriesWithSoundgifsQuery implements IQuery {}

export class GetAllCategoriesWithSoundgifsQueryResult implements IQueryResult {
  constructor(public readonly categoriesWithSoundgifs: CategoriesWithSoundgifs[]) {}
}
