import { Injectable, Scope, ConsoleLogger } from '@nestjs/common';
import { LoggerCtx } from './logger-ctx.provider';

@Injectable({ scope: Scope.TRANSIENT })
export class LoggerService extends ConsoleLogger {
  constructor(
    public ctx: LoggerCtx,
    name?: string,
  ) {
    super(name);
  }

  log(message: string) {
    // TODO: switch console.log to winston logger
    console.log(`[LOG][${this.context}]`, message, this.ctx?.labels);
  }
  error(message: string, trace: string) {
    // TODO: switch console.log to winston logger
    console.log(`[ERROR][${this.context}]`, message, trace, this.ctx?.labels);
  }
  warn(message: string) {
    // TODO: switch console.log to winston logger
    console.log(`[WARN][${this.context}]`, message, this.ctx?.labels);
  }
  debug(message: string) {
    // TODO: switch console.log to winston logger
    console.log(`[DEBUG][${this.context}]`, message, this.ctx?.labels);
  }
  verbose(message: string) {
    // TODO: switch console.log to winston logger
    console.log(`[VERBOSE][${this.context}]`, message, this.ctx?.labels);
  }
}
