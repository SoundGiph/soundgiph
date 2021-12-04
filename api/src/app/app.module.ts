import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SnakeNamingStrategy } from '../config/orm/snake-naming-config';
import { SoundGifModule } from '../sound-gif/sound-gif.module';
@Module({
  imports: [
    SoundGifModule,
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('POSTGRES_HOST', 'localhost'),
        port: configService.get<number>('POSTGRES_PORT', 5432),
        username: configService.get('POSTGRES_USER', 'soundgif'),
        password: configService.get('POSTGRES_PASSWORD', 'soundgif'),
        database: configService.get('POSTGRES_DATABASE', 'soundgif'),
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        migrationsTableName: 'migration',
        migrations: ['src/migration/*.ts'],
        namingStrategy: new SnakeNamingStrategy(),
        cli: {
          migrationsDir: 'src/migration',
        },
      }),
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
