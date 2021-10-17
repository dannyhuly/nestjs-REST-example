import { prefixesForLoggers as contextsForLoggers } from './logger.decorator';
import { Provider } from '@nestjs/common';
import { LoggerService } from './logger.service';

const ProviderPrefix = 'LoggerService';

function loggerFactory(logger: LoggerService, context: string) {
  if (context) {
    logger.setContext(context);
  }
  return logger;
}

function createLoggerProvider(context: string): Provider<LoggerService> {
  return {
    provide: getLoggerProviderToken(context),
    useFactory: logger => loggerFactory(logger, context),
    inject: [LoggerService],
  };
}

export function getLoggerProviderToken(context: string): string {
    return `${ProviderPrefix}${context}`;
}

export function createLoggerProviders(): Array<Provider<LoggerService>> {
  return contextsForLoggers.map(context => createLoggerProvider(context));
}