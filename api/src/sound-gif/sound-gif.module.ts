import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AzureBlobStorageModule } from '../azure-blob-storage/azure-blob-storage.module';
import { SoundGifApplications } from './core/application/sound-gif.application';
import { SoundGifEntity } from './core/domain/sound-gif.entity';
import { SoundGifInfrastructure } from './infrastructure/sound-gif.infrastructure';
import { SoundGifInterface } from './interface/sound-gif.interface';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      SoundGifEntity,
      ...SoundGifInfrastructure.repositories,
    ]),
    ConfigModule,
    CqrsModule,
    AzureBlobStorageModule,
  ],
  providers: [
    ...SoundGifInterface.resolvers,
    ...SoundGifInfrastructure.providers,
    ...SoundGifApplications,
  ],
  controllers: [...SoundGifInterface.controllers],
  exports: [],
})
export class SoundGifModule {}
