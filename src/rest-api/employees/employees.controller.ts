import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Query,
  Put,
  Delete,
  HttpCode,
  ParseIntPipe,
} from '@nestjs/common';
import { ApiTags, ApiParam } from '@nestjs/swagger';

import { PagingRequestDto } from '../dto';
import { CreateEmployeeDto, UpdateEmployeeDto } from './EmployeeDto';
import { EmployeesService } from '../../services/employee.service';
import { IEmployee } from 'src/models/IEmployee';

@ApiTags('employees')
@Controller('employees')
export class EmployeesController {
  constructor(private employeesService: EmployeesService) { }

  @Post()
  async create(@Body() employeeDto: CreateEmployeeDto) {
    await this.employeesService.create(employeeDto)
    return employeeDto;
  }

  @Get()
  findAll(@Query() pagingRequestDto: PagingRequestDto) {
    return this.employeesService.findAll(pagingRequestDto);
  }

  @Get(':id')
  @ApiParam({ name: 'id', required: true, type: Number })
  findOne(@Param('id', ParseIntPipe) id: IEmployee['id']) {
    return this.employeesService.find(id);
  }

  @Put(':id')
  @ApiParam({ name: 'id', required: true, type: Number })
  update(@Param('id', ParseIntPipe) id: IEmployee['id'], @Body() updateEemployeeDto: UpdateEmployeeDto) {
    return this.employeesService.update(id, updateEemployeeDto)
  }

  @Delete(':id')
  @HttpCode(204)
  @ApiParam({ name: 'id', required: true, type: Number })
  remove(@Param('id', ParseIntPipe) id: IEmployee['id']) {
    this.employeesService.delete(id);
  }
}
