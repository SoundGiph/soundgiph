import { IQuery, IQueryResult } from '@nestjs/cqrs';
import { SoundGifEntity } from '../../../domain/sound-gif.entity';

export type CreateSoundGifPayload = {
  title: string;
  audioFile: File;
  imageFile: File;
  description?: string;
  personalityName?: string;
};

export class CreateSoundGifCommand implements IQuery {
  constructor(public readonly payload: CreateSoundGifPayload) {}
}

export class CreateSoundGifCommandResult implements IQueryResult {
  constructor(public readonly createdSoundGif: SoundGifEntity) {}
}
