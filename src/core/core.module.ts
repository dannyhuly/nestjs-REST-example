import { Module } from '@nestjs/common';
import { LoggerModule } from './logger';
import { ConfigModule } from '@nestjs/config';
import configuration from '../config/configuration';

@Module({
  imports: [
    LoggerModule.forRoot(),
    ConfigModule.forRoot({
      ignoreEnvFile: true,
      load: [configuration],
    }),
  ],
  exports: [
    LoggerModule,
    ConfigModule,
  ],
})
export class CoreModule { }
