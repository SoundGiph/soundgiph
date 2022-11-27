import { UserEntity } from "../../../../user/core/domain/user.entity";
import { SoundGifEntity, SoundGifEntityMandatoryFields } from "../../domain/sound-gif.entity";
import { IncrementSharedCountPayload } from "../commands/increment-shared-count/increment-shared-count.command";
import { FindSoundGifPayload } from "../queries/find-sound-gif/find-sound-gif.query";
export abstract class SoundGifPort {
  abstract find(payload: FindSoundGifPayload): Promise<SoundGifEntity[]>;
  abstract getAllCategories(): Promise<string[]>;
  abstract create(
    payload: Partial<SoundGifEntity> & SoundGifEntityMandatoryFields,
    userId: UserEntity["id"]
  ): Promise<SoundGifEntity>;
  abstract incrementSharedCount(payload: IncrementSharedCountPayload): Promise<void>;
}
