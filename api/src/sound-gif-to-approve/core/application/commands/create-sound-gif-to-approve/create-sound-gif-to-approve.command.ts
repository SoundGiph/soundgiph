import { ICommand } from "@nestjs/cqrs";
import { SoundGifToApproveEntity } from "src/sound-gif-to-approve/core/domain/sound-gif-to-approve.entity";

export type CreateSoundGifToApprovePayload = Pick<
  SoundGifToApproveEntity,
  "title" | "description" | "audioUrl" | "imageUrl" | "addedBy"
>;

export class CreateSoundGifToApproveCommand implements ICommand {
  constructor(public readonly payload: CreateSoundGifToApprovePayload) {}
}

export class CreateSoundGifToApproveCommandResult {
  constructor(public readonly createdSoundGifToApprove: SoundGifToApproveEntity) {}
}
