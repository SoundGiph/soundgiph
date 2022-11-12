import {
  Body,
  Controller,
  Logger,
  Post,
  Req,
  UnauthorizedException,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from "@nestjs/common";
import { CommandBus } from "@nestjs/cqrs";
import { FileFieldsInterceptor } from "@nestjs/platform-express";
import "multer";
import { UserEntity } from "src/user/core/domain/user.entity";
import { UserAuthenticatedRequest } from "src/user/interface/user.controller";
import {
  CreateSoundGifToApproveCommand,
  CreateSoundGifToApproveCommandResult,
} from "../core/application/commands/create-sound-gif-to-approve/create-sound-gif-to-approve.command";

type CreateSoundGifToApproveRequestPayload = {
  title: string;
  description: string;
  addedBy: UserEntity["id"];
};

type CreateSoundGifToApproveRequestFilesPayload = {
  audioFile: Express.Multer.File;
  imageFile: Express.Multer.File;
};

@Controller()
export class CreateSoundGifToApproveController {
  logger = new Logger();
  constructor(private readonly commandBus: CommandBus) {}

  @Post("/createSoundGifToApprove")
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: "imageFile", maxCount: 1 },
      { name: "audioFile", maxCount: 1 },
    ])
  )
  @UseGuards()
  async createSoundGifToApprove(
    @Req() req: UserAuthenticatedRequest,
    @UploadedFiles()
    files: CreateSoundGifToApproveRequestFilesPayload,
    @Body()
    payload: CreateSoundGifToApproveRequestPayload
  ): Promise<boolean> {
    if (!files) throw new Error(`Invalid files: ${JSON.stringify(files)}`);
    if (!req.user) throw new UnauthorizedException();
    return await this.commandBus.execute<
      CreateSoundGifToApproveCommand,
      CreateSoundGifToApproveCommandResult
    >(new CreateSoundGifToApproveCommand({ ...payload, ...files, user: req.user }));
  }
}
