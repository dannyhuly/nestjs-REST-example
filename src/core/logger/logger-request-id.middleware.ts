import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as uuid from 'uuid';
import { LoggerCtx } from './logger-ctx.provider';

/**
 * Add `traseId` label to logger context on each request
 */
@Injectable()
export class LoggerRequestIdMiddleware implements NestMiddleware {
  constructor(private ctx: LoggerCtx){ }

  use(req: Request, res: Response, next: NextFunction) {
    this.ctx.withLabel('traseId', uuid.v4());
    next();
  }
}
