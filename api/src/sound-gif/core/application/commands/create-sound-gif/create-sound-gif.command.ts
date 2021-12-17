import { ICommand } from '@nestjs/cqrs';
import { SoundGifEntity } from '../../../domain/sound-gif.entity';

export type CreateSoundGifPayload = {
  title: string;
  audioUrl: string;
  imageUrl: string;
  description?: string;
  personalityName?: string;
};

export class CreateSoundGifCommand implements ICommand {
  constructor(public readonly payload: CreateSoundGifPayload) {}
}

export class CreateSoundGifCommandResult {
  constructor(public readonly createdSoundGif: SoundGifEntity) {}
}
