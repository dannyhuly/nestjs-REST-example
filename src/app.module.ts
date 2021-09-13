import { Module } from '@nestjs/common';

import { CoreModule, LoggerService } from './core';
import { RestApiModule } from './rest-api';
import { RepositoryModule } from './repository';

@Module({
  imports: [
    CoreModule,
    RestApiModule,
    RepositoryModule,
  ]
})
export class AppModule {
  constructor(logger: LoggerService) {
    logger.setContext('AppModule');
    logger.log('loaded');
  }
}
