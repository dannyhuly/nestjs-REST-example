import { NestFactory } from '@nestjs/core';
import { INestApplication } from '@nestjs/common';

import { MigrationModule } from './migration';

async function bootstrap() {
  const migrationApp = await NestFactory.create(MigrationModule);
  return migrationApp.init();
}

// singleton export
const app = bootstrap();
export const getApp = async (): Promise<INestApplication> => {
  return await app
};
