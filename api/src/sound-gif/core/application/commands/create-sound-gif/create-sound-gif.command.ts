import { ICommand } from '@nestjs/cqrs';
import { SoundGifEntity } from '../../../domain/sound-gif.entity';

export type CreateSoundGifPayload = {
  title: string;
  audioFile: Express.Multer.File;
  imageFile: Express.Multer.File;
  description?: string;
  personalityName?: string;
};

export class CreateSoundGifCommand implements ICommand {
  constructor(public readonly payload: CreateSoundGifPayload) {}
}

export class CreateSoundGifCommandResult {
  constructor(public readonly createdSoundGif: SoundGifEntity) {}
}
