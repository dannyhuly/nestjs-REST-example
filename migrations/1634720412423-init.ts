import { getRepositoryToken } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { getApp } from "../src/migrations"
import { Employee } from "../src/repository";

export async function up() {
  const app = await getApp();
  const employeeRepository = app.get<Repository<Employee>>(getRepositoryToken(Employee));

  await employeeRepository.save({
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.dow@example.com',
    salary: 1000
  });
}

export async function down() {
  const app = await getApp();
  const employeeRepository = app.get<Repository<Employee>>(getRepositoryToken(Employee));

  await employeeRepository.delete({ email: 'john.dow@example.com' });
}
