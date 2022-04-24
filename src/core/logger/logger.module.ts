import { DynamicModule } from '@nestjs/common';
import { LoggerService } from './logger.service';
import { createLoggerProviders } from './logger.provider';
import { LoggerCtx } from './logger-ctx.provider';
export class LoggerModule {
  static forRoot(): Promise<DynamicModule> {

    return new Promise(resolve => {
      setTimeout(() => {
        const prefixedLoggerProviders = createLoggerProviders();
        resolve({
          module: LoggerModule,
          providers: [
            LoggerCtx,
            LoggerService, 
            ...prefixedLoggerProviders,
          ],
          exports: [
            LoggerCtx, 
            LoggerService,
            ...prefixedLoggerProviders
          ],
        })
      }, 0);
    })

  }
}