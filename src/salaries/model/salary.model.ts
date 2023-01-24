import {
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { InvoiceSalary } from 'src/invoices/models/invoiceSalary.model';

export const valuesOfSalaryType = ['fixed', 'perHour', 'perProject'] as const;
export type TypeOfSalary = (typeof valuesOfSalaryType)[number];

@Table({ tableName: 'salaries' })
export class Salary extends Model<Salary> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({ type: DataType.ENUM(...valuesOfSalaryType), allowNull: false })
  typeOfSalary: TypeOfSalary;

  //fixed
  @Column({ type: DataType.INTEGER })
  fixedValue: number;

  @Column({ type: DataType.DATE, defaultValue: DataType.NOW })
  fixedDate: Date;

  //perHour
  @Column({ type: DataType.INTEGER })
  perHourValue: number;

  @Column({ type: DataType.INTEGER })
  hours: number;

  @Column({ type: DataType.DATE, defaultValue: DataType.NOW })
  HoursDate: Date;

  //perProject
  @Column({ type: DataType.INTEGER })
  perProjectValue: number;

  @Column({ type: DataType.DATE, defaultValue: DataType.NOW })
  projectStart: Date;

  @Column({ type: DataType.DATE })
  projectEnd: Date;

  @ForeignKey(() => InvoiceSalary)
  invoiceSalaryId: string;
}
