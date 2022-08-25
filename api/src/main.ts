import { NestFactory } from "@nestjs/core";
import * as cookieParser from "cookie-parser";
import { json, urlencoded } from "express";
import { AppModule } from "./app/app.module";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.use(json({ limit: "3mb" }));
  app.use(urlencoded({ extended: true, limit: "3mb" }));
  app.use(cookieParser());
  await app.listen(3000);
}

bootstrap();
