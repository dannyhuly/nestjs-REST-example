import { Inject } from '@nestjs/common';
import { getLoggerProviderToken } from './logger.provider';

export const prefixesForLoggers: string[] = new Array<string>();

export function Logger(prefix: string = '') {
  if (!prefixesForLoggers.includes(prefix)) {
    prefixesForLoggers.push(prefix);
  }
  return Inject(getLoggerProviderToken(prefix));
}