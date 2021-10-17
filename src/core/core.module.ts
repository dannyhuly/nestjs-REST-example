import { Module } from '@nestjs/common';
import { LoggerModule } from './logger';

@Module({
  imports: [LoggerModule.forRoot()],
  exports: [LoggerModule],
})
export class CoreModule {}
