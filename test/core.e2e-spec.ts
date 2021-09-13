import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { CoreModule, LoggerService } from '../src/core';


describe('CoreModule (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [CoreModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('Should expose logger', async () => {
    const logger = await app.resolve(LoggerService);
    logger.setContext('TEST');
    logger.log('test');
    logger.warn('test');
    logger.error('test', null);
    logger.debug('test');
    logger.debug('verbose');
  });

});
