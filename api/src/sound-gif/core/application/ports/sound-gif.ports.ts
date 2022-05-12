import { SoundGifEntity, SoundGifEntityMandatoryFields } from "../../domain/sound-gif.entity";
import { FindSoundGifPayload } from "../queries/find-sound-gif/find-sound-gif.query";
export abstract class SoundGifPort {
  abstract find(payload: FindSoundGifPayload): Promise<SoundGifEntity[]>;
  abstract getAllCategories(): Promise<string[]>;
  abstract create(
    payload: Partial<SoundGifEntity> & SoundGifEntityMandatoryFields
  ): Promise<SoundGifEntity>;
}
