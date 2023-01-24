import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  HasOne,
  Model,
  Table,
} from 'sequelize-typescript';
import { Developer } from 'src/developers/developer.model';
import { Salary } from 'src/salaries/model/salary.model';
import { Invoice } from './invoice.model';

@Table({ tableName: 'invoice_salary' })
export class InvoiceSalary extends Model<InvoiceSalary> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @HasOne(() => Salary)
  invoiceSalary: Salary;

  @HasOne(() => Developer)
  developer: Developer;

  @ForeignKey(() => Invoice)
  @Column({ type: DataType.INTEGER })
  invoiceId: number;

  @BelongsTo(() => Invoice)
  invoice: Invoice;
}
