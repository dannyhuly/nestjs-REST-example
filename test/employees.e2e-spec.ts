import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository, DeleteResult, UpdateResult } from 'typeorm';
import * as request from 'supertest';

import { EmployeesController } from '../src/rest-api/employees/employees.controller';
import { CreateEmployeeDto, UpdateEmployeeDto } from '../src/rest-api/employees/EmployeeDto';
import { EmployeesService } from '../src/services/employee.service';
import { Employee } from '../src/repository';
import { LoggerService } from '../src/core';


describe('EmployeesController (e2e)', () => {
  let app: INestApplication;
  let repo: Repository<Employee>;

  const employeeDto: CreateEmployeeDto = {
    firstName: "John",
    lastName: "Doe",
    email: "John.Doe@somewhere.com",
    salary: 1000,
  }

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      controllers: [EmployeesController],
      providers: [
        {
          provide: getRepositoryToken(Employee),
          useClass: Repository,
        },
        EmployeesService,
        LoggerService,
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());

    repo = app.get<Repository<Employee>>(getRepositoryToken(Employee));

    await app.init();
  });

  it('/employees (GET)', () => {
    const employeeList: Employee[] = [
      { ...employeeDto, id: 1 },
      { ...employeeDto, id: 2 }
    ];

    jest.spyOn(repo, 'find').mockResolvedValueOnce(Promise.resolve(employeeList))

    return request(app.getHttpServer())
      .get('/employees')
      .expect(200)
      .expect(employeeList);
  });

  it('/employees/:id (GET)', () => {
    const id = 1;
    const employee: Employee = { ...employeeDto, id };

    jest.spyOn(repo, 'findOne').mockResolvedValueOnce(Promise.resolve(employee));

    return request(app.getHttpServer())
      .get(`/employees/${id}`)
      .expect(200)
      .expect(employee);
  });

  it('/employees (POST)', () => {
    jest.spyOn(repo, 'save').mockResolvedValueOnce(Promise.resolve({ ...employeeDto, id: 1 }));

    return request(app.getHttpServer())
      .post(`/employees`)
      .send(employeeDto)
      .expect(201);
  });

  it('/employees/:id (PUT)', () => {
    const id = 1;
    const updateEmployeeDto: UpdateEmployeeDto = { firstName: employeeDto.firstName };
    const updateResult: UpdateResult = { raw: [], generatedMaps: [], affected: 1 }

    jest.spyOn(repo, 'update').mockResolvedValueOnce(Promise.resolve(updateResult));

    return request(app.getHttpServer())
      .put(`/employees/${id}`)
      .send(updateEmployeeDto)
      .expect(200);
  });

  it('/employees/:id (DELETE)', () => {
    const id = 1;
    jest.spyOn(repo, 'delete').mockResolvedValueOnce(Promise.resolve({} as DeleteResult));

    return request(app.getHttpServer())
      .delete(`/employees/${id}`)
      .expect(204);
  });
});
