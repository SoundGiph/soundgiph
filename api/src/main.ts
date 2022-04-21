import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app/app.module";
import { urlencoded, json } from 'express';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.use(json({ limit: '3mb' }));
  app.use(urlencoded({ extended: true, limit: '3mb' }));
  await app.listen(3000);
}

bootstrap();
