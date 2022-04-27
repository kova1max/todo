import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { GlobalExceptionFilter } from './global-exception.filter';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { INestApplication } from '@nestjs/common';

const API_PREFIX = 'api';

(async () => {
  const app: INestApplication = await NestFactory.create(AppModule);

  app.enableCors();
  app.setGlobalPrefix(process.env.API_PREFIX || API_PREFIX);
  app.useGlobalFilters(new GlobalExceptionFilter());

  const config = new DocumentBuilder()
    .setTitle('TODO API')
    .setDescription('The TODO API provides access to users, lists etc.')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup(process.env.API_PREFIX || API_PREFIX, app, document);

  await app.listen(80);
})();
