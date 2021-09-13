import { Injectable, Scope, ConsoleLogger } from '@nestjs/common';

@Injectable({ scope: Scope.TRANSIENT })
export class LoggerService extends ConsoleLogger {
  constructor(context?: string) {
    super(context);
  }

  log(message: string) {
    // TODO: switch console.log to winston logger
    console.log(`[LOG][${this.context}]`, message);
  }
  error(message: string, trace: string) {
    // TODO: switch console.log to winston logger
    console.log(`[ERROR][${this.context}]`, message, trace);
  }
  warn(message: string) {
    // TODO: switch console.log to winston logger
    console.log(`[WARN][${this.context}]`, message);
  }
  debug(message: string) {
    // TODO: switch console.log to winston logger
    console.log(`[DEBUG][${this.context}]`, message);
  }
  verbose(message: string) {
    // TODO: switch console.log to winston logger
    console.log(`[VERBOSE][${this.context}]`, message);
  }
}
