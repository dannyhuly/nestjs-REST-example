import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { CoreModule, LoggerService, Logger } from './core';
import { RestApiModule } from './rest-api';
import { RepositoryModule } from './repository';
import { IEnvironmentConfig } from './config/IEnvironmentConfig';

@Module({
  imports: [
    CoreModule,
    RestApiModule,
    RepositoryModule,
  ]
})
export class AppModule {
  constructor(
    @Logger('AppModule') private logger: LoggerService,
    private configService: ConfigService,
  ) {
    this.logger.debug('loaded');
    const environmentConfig = this.configService.get<IEnvironmentConfig>('environment');
    this.logger.log(`Environment: ${environmentConfig.type}`);
  }
}
