import { IQuery, IQueryResult } from "@nestjs/cqrs";
import { SoundGifEntity } from "../../../domain/sound-gif.entity";

export type GetOneSoundGifPayload = {
  id: SoundGifEntity["id"];
};
export class GetOneSoundGifQuery implements IQuery {
  constructor(public readonly payload: GetOneSoundGifPayload) {}
}

export class GetOneSoundGifQueryResult implements IQueryResult {
  constructor(public readonly soundGif: SoundGifEntity) {}
}
