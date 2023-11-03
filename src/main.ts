import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import express from 'express';
import * as path from 'path';
import { ServeStaticModule } from '@nestjs/serve-static';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder()
    .setTitle('Ecomerse')
    .setDescription('Ecomerse API')
    .setVersion('1.0')
    .addTag('Ecomerse')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  app.enableCors()

  app.useGlobalPipes(new ValidationPipe());
  const configureSrvice = app.get(ConfigService)
  const port = configureSrvice.get<number>('PORT')

  await app.listen(port);
}
bootstrap();
