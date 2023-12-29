import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({ allowedHeaders: '*', origin: '*' });
  dotenv.configDotenv();
  app.useGlobalPipes(
    new ValidationPipe({ always: true, forbidNonWhitelisted: true }),
  );
  const config = new DocumentBuilder()
    .setTitle('application example')
    .setDescription('The apploectionn API description')
    .setVersion('1.0')
    .addTag('cats')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(8002);
}
bootstrap();
