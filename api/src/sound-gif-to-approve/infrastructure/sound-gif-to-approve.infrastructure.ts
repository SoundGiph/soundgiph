import { SoundGifToApproveEntity } from "../core/domain/sound-gif-to-approve.entity";
import { SoundGifToApproveAdapter } from "./sound-gif-to-approve.adapter";

export const soundGifToApproveInfrastructure = {
  providers: [{ provide: SoundGifToApproveEntity, useClass: SoundGifToApproveAdapter }],
  repositories: [SoundGifToApproveEntity],
};
