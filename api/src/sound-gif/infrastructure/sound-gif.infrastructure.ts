import { SoundGifEntity } from "../core/domain/sound-gif.entity";
import { SoundGifAdapter } from "./sound-gif.adapter";

export const SoundGifInfrastructure = {
  providers: [{ provide: SoundGifEntity, useClass: SoundGifAdapter }],
};
