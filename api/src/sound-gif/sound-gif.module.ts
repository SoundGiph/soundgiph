import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';
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
    CqrsModule,
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
