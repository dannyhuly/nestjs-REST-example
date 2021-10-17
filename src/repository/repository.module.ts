import { Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';
import { CoreModule, LoggerService, Logger } from '../core';
import { Employee } from './employee.entity';

const EmployeeRepository = TypeOrmModule.forFeature([Employee]);

@Module({
  imports: [
    CoreModule,
    TypeOrmModule.forRoot({
      type: 'better-sqlite3',
      database: 'employees-service-db.sqlite',
      entities: [
        Employee,
      ],
      synchronize: true,
    }),
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
