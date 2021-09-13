import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsNotEmpty, IsEmail } from 'class-validator';
import { IEmployee } from 'src/models/IEmployee';

export class CreateEmployeeDto implements IEmployee {
  @ApiProperty()
  @IsNotEmpty()
  firstName: string;

  @ApiProperty()
  @IsNotEmpty()
  lastName: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({type: Number, minimum: 0})
  @IsNotEmpty()
  salary: number;
}

export class UpdateEmployeeDto extends PartialType(CreateEmployeeDto) {}
