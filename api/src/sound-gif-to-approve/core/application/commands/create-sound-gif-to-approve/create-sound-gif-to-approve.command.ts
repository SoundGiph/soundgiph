import { ICommand } from "@nestjs/cqrs";
import { UserEntity } from "../../../../../user/core/domain/user.entity";

export interface CreateSoundGifToApprovePayload {
  audioFile: Express.Multer.File;
  imageFile: Express.Multer.File;
  title: string;
  description: string;
  user: UserEntity;
}

export class CreateSoundGifToApproveCommand implements ICommand {
  constructor(public readonly payload: CreateSoundGifToApprovePayload) {}
}

export type CreateSoundGifToApproveCommandResult = boolean;
