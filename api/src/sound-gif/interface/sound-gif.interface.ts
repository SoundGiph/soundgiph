import { CreateSoundGifController } from './controllers/create-sound-gif.controllers';
import { FindSoundGifController } from './controllers/find-sound-gif.controller';

export const SoundGifInterface = {
  controllers: [FindSoundGifController, CreateSoundGifController],
};
