import { ICommand } from "@nestjs/cqrs";
import { SoundGifEntity } from "../../../domain/sound-gif.entity";

export type CreateSoundGifPayload = Pick<
  SoundGifEntity,
  "title" | "description" | "tags" | "reactions" | "categories" | "audioUrl" | "imageUrl"
>;

export class CreateSoundGifCommand implements ICommand {
  constructor(public readonly payload: CreateSoundGifPayload) {}
}

export class CreateSoundGifCommandResult {
  constructor(public readonly createdSoundGif: SoundGifEntity) {}
}
