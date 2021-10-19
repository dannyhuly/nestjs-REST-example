import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CoreModule, LoggerService, Logger } from '../core';
import { Employee } from './employee.entity';
import { IDatabaseConfig } from 'src/config/IDatabaseConfig';

const EmployeeRepository = TypeOrmModule.forFeature([Employee]);

@Module({
  imports: [
    CoreModule,

    // TODO: Extract TypeOrmModule setup to external file (see: TypeOrmOptionsFactory)
    TypeOrmModule.forRootAsync({
      imports: [CoreModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'better-sqlite3',
        database: configService.get<IDatabaseConfig>('database').sqliteDatabase,
        entities: [
          Employee,
        ],
        synchronize: true,
      })
    }),
    // END

    EmployeeRepository,
  ],
  exports: [
    EmployeeRepository
  ]
})
export class RepositoryModule {
  constructor(@Logger('RepositoryModule') logger: LoggerService) {
    logger.log('loaded');
  }
}
