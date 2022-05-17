import { ICommand } from "@nestjs/cqrs";
import { SoundGifEntity } from "../../../domain/sound-gif.entity";

export interface IncrementSharedCountPayload { id: SoundGifEntity["id"] }

export class IncrementSharedCountCommand implements ICommand {
  constructor(public readonly payload: IncrementSharedCountPayload) { }
}

