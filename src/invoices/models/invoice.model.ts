import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  HasMany,
  HasOne,
  Model,
  Table,
} from 'sequelize-typescript';
import { Client } from 'src/clients/model/client.model';
import { Income } from 'src/incomes/models/icomes.model';
import { InvoiceSalary } from './invoiceSalary.model';
import {
  TypeOfSalary,
  valuesOfSalaryType,
} from 'src/salaries/model/salary.model';

export const valuesOfInvoiceStatus = ['opened', 'closed', 'overdue'] as const;
export type TypeOfInvoiceStatus = typeof valuesOfInvoiceStatus;

@Table({ tableName: 'invoices' })
export class Invoice extends Model<Invoice> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id?: number;

  @Column({ type: DataType.INTEGER })
  invoiceNumber: number;

  @Column({ type: DataType.INTEGER, allowNull: false })
  value: number;

  @Column({ type: DataType.DATE, defaultValue: DataType.NOW })
  dateOfOpen: Date;

  @Column({ type: DataType.DATE })
  dateOfDue: Date;

  @Column({ type: DataType.DATE })
  dateOfClose: Date;

  @Column({ type: DataType.STRING })
  currency: string;

  @Column({
    type: DataType.ENUM(...valuesOfInvoiceStatus),
    defaultValue: valuesOfInvoiceStatus[0],
  })
  invoiceStatus: TypeOfInvoiceStatus;

  @Column({ type: DataType.ENUM(...valuesOfSalaryType) })
  invoiceSalaryType: TypeOfSalary;

  @HasMany(() => InvoiceSalary)
  invoiceSalaries: InvoiceSalary[];

  @HasOne(() => Income)
  income: Income;

  @ForeignKey(() => Client)
  clientId: number;

  @BelongsTo(() => Client)
  client: Client;
}
