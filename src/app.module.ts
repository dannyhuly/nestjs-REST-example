import { Module } from '@nestjs/common';

import { CoreModule, LoggerService, Logger } from './core';
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
  constructor(@Logger('AppModule') logger: LoggerService) {
    logger.debug('loaded');
  }
}
