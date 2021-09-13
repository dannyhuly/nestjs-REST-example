import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

import { AppModule } from './app.module';
import { LoggerService } from './core';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
  });

  // set logger
  const logger = await app.resolve(LoggerService);
  logger.setContext('Main');
  app.useLogger(logger);

  // set validation
  app.useGlobalPipes(new ValidationPipe());

  // create swagger app
  const config = new DocumentBuilder()
    .setTitle('employees-service')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  process.on('SIGINT', async () => {
    logger.log("Shutdown | started !");
    await app.close();
    logger.log("Shutdown | done !");
  });

  const port = 3000;
  await app.listen(port);
}
bootstrap();
