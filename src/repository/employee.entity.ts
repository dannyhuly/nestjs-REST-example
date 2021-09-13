import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { IEmployee } from 'src/models/IEmployee';

@Entity({ name: 'employees' })
export class Employee implements IEmployee {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({
    unique: true,
  })
  email: string;

  @Column()
  salary: number;
}