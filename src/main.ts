import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

import { AppModule } from './app.module';
import { Logger } from './core';
import { getLoggerProviderToken } from './core/logger/logger.provider';
import { ConfigService } from '@nestjs/config';
import { IHttpServerConfig } from './config/IHttpServerConfig';

async function bootstrap() {
  Logger('Main'); // declare new logger before initalizing the application

  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
  });

  // set logger
  const logger = await app.resolve(getLoggerProviderToken('Main'));
  app.useLogger(logger);

  // get config
  const configService = await app.resolve(ConfigService);
  const httpServerConfig = configService.get<IHttpServerConfig>('httpServer');

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

  await app.listen(httpServerConfig.port);
  logger.log(`Server started on port: ${httpServerConfig.port}`);
}
bootstrap();
