import { SoundGifToApproveEntity } from "../../domain/sound-gif-to-approve.entity";

export abstract class SoundGifToApprovePort {
  abstract create(payload: Partial<SoundGifToApproveEntity>): Promise<SoundGifToApproveEntity>;
}
