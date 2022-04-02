import { SoundGifEntity, SoundGifEntityMandatoryFields } from "../../domain/sound-gif.entity";
import { FindSoundGifPayload } from "../queries/find-sound-gif/find-sound-gif.query";
import { CategoriesWithSoundGifs } from "../queries/get-all-categories-with-soundgifs/get-all-categories-with-soundgifs.command";

export abstract class SoundGifPort {
  abstract find(payload: FindSoundGifPayload): Promise<SoundGifEntity[]>;
  abstract getAllCategories(): Promise<string[]>;
  abstract getAllCategoriesWithSoundGifs(): Promise<CategoriesWithSoundGifs[]>;
  abstract create(payload: Partial<SoundGifEntity> & SoundGifEntityMandatoryFields): Promise<SoundGifEntity>;
}
