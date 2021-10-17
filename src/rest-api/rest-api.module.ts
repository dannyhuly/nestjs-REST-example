import { Module } from '@nestjs/common';

import { CoreModule, LoggerService, Logger } from '../core';
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
  constructor(@Logger('RestApiModule') logger: LoggerService) {
    logger.log('loaded');
  }
}
