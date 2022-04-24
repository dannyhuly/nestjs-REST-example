import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindManyOptions } from 'typeorm';

import { Employee } from '../repository';
import { LoggerService, Logger } from '../core';
import { IEmployee } from '../models/IEmployee';
import { IPagingRequest } from '../models/IPagingRequest';

@Injectable()
export class EmployeesService {
    constructor(
        @InjectRepository(Employee) private employeeRepository: Repository<Employee>,
        @Logger('EmployeesService') private logger: LoggerService,
    ) { }

    async create(employee: IEmployee) {
        this.logger.verbose(`create ${employee}`);
        const newEmployee = await this.employeeRepository.save(employee);
        this.logger.debug(`employee created: ${newEmployee.id}`);
        return newEmployee;
    }

    async find(id: IEmployee['id']) {
        this.logger.verbose(`get: ${id}`);
        const employee = await this.employeeRepository.findOne(id);
        if(!employee) {
            throw new NotFoundException({ id,  error: `Employees not found` });
        }
        return employee;
    }

    async findAll(paging: IPagingRequest): Promise<Employee[]> {
        this.logger.verbose(`get: ${paging}`);
        const query: FindManyOptions<Employee> = {};
        if (paging) {
            query.take = paging.pageSize;
            query.skip = (paging.page - 1) * paging.pageSize;
        }
        return await this.employeeRepository.find(query);
    }

    async update(id: IEmployee['id'], employee: Partial<IEmployee>) {
        this.logger.verbose(`update ${employee}`);
        const res = await this.employeeRepository.update({ id }, employee);
        if(res.affected == 0) {
            throw new NotFoundException({ id,  error: `Employees not found` });
        }
        return res;
    }

    async delete(id: IEmployee['id']) {
        this.logger.verbose(`delete ${id}`);
        const res = await this.employeeRepository.delete(id);
        if(res.affected == 0) {
            throw new NotFoundException({ id,  error: `Employees not found` });
        }
        return res;
    }

}