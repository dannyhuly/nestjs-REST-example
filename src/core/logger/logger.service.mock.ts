import { LoggerService } from './logger.service';
import { LoggerCtx } from './logger-ctx.provider';

jest.mock('./logger.service');
jest.mock('./logger-ctx.provider');

export type LoggerServiceMock = jest.Mocked<LoggerService>;
const LoggerServiceMock = LoggerService as {
  new (): LoggerServiceMock;
};

export const LoggerServiceMockHelper = {
  createMock() {
    const mock = new LoggerServiceMock();
    mock.ctx = new LoggerCtx();
    return mock;
  }
};