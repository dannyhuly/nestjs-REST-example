import { Module } from '@nestjs/common';

import { CoreModule, LoggerService } from '../core';
import { EmployeesController } from './employees/employees.controller';
import { EmployeesService } from '../services/employee.service';
import { RepositoryModule } from '../repository';

@Module({
  imports: [
    CoreModule,
    RepositoryModule,
  ],
  controllers: [
    EmployeesController,
  ],
  providers: [
    EmployeesService
  ],
})
export class RestApiModule {
  constructor(logger: LoggerService) {
    logger.setContext('RestApiModule');
    logger.log('loaded');
  }
}
