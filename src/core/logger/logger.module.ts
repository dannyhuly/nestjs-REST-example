import { Module, DynamicModule } from '@nestjs/common';
import { LoggerService } from './logger.service';
import { createLoggerProviders } from './logger.provider';

export class LoggerModule {
  static forRoot(): Promise<DynamicModule> {

    return new Promise(resolve => {
      setTimeout(() => {
        const prefixedLoggerProviders = createLoggerProviders();
        resolve({
          module: LoggerModule,
          providers: [LoggerService, ...prefixedLoggerProviders],
          exports: [LoggerService, ...prefixedLoggerProviders],
        })
      }, 0);
    })

  }
}