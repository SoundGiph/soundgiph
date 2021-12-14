import {
  Body,
  Controller,
  Get,
  Post,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import {
  CreateSoundGifCommand,
  CreateSoundGifCommandResult,
} from '../core/application/commands/create-sound-gif/create-sound-gif.command';
import { FindMostRecentSoundGifQuery } from '../core/application/queries/find-most-recent-sound-gif/find-most-recent-sound-gif.query';
import { FindMostSharedSoundGifQuery } from '../core/application/queries/find-most-shared-sound-gif/find-most-shared-sound-gif.query';
import {
  FindSoundGifPayload,
  FindSoundGifQuery,
} from '../core/application/queries/find-sound-gif/find-sound-gif.query';
import { SoundGifEntity } from '../core/domain/sound-gif.entity';
import 'multer';

type CreateSoundGifRequestPayload = {
  title: string;
  description?: string;
  personalityName?: string;
};

type CreateSoundGifRequestFilesPayload = {
  audioFile: Express.Multer.File;
  imageFile: Express.Multer.File;
};
@Controller()
export class SoundGifController {
  constructor(private readonly queryBus: QueryBus) {}

  @Post('/create')
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'imageFile', maxCount: 1 },
      { name: 'audioFile', maxCount: 1 },
    ]),
  )
  async create(
    @UploadedFiles()
    files: CreateSoundGifRequestFilesPayload,
    @Body()
    payload: CreateSoundGifRequestPayload,
  ): Promise<SoundGifEntity> {
    const { createdSoundGif } = await this.queryBus.execute<
      CreateSoundGifCommand,
      CreateSoundGifCommandResult
    >(
      new CreateSoundGifCommand({
        ...payload,
        ...files,
      }),
    );
    return createdSoundGif;
  }

  @Post('/find')
  async find(@Body() payload: FindSoundGifPayload): Promise<SoundGifEntity> {
    const { fulltext } = payload;
    return await this.queryBus.execute<FindSoundGifQuery>(
      new FindSoundGifQuery({
        fulltext,
      }),
    );
  }

  @Get('/findMostRecent')
  async findMostRecent(): Promise<SoundGifEntity> {
    return await this.queryBus.execute<FindMostRecentSoundGifQuery>(
      new FindMostRecentSoundGifQuery(),
    );
  }

  @Get('/findMostShared')
  async findMostShared(): Promise<SoundGifEntity> {
    return await this.queryBus.execute<FindMostSharedSoundGifQuery>(
      new FindMostSharedSoundGifQuery(),
    );
  }
}
