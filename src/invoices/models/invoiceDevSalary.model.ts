import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { InvoiceDeveloper } from './invoiceDeveloper.model';

@Table({ tableName: 'invoice_dev_salary' })
export class InvoiceDevSalary extends Model<InvoiceDevSalary> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id?: number;

  @Column({ type: DataType.INTEGER, allowNull: false })
  salaryValue: number;

  @Column({ type: DataType.STRING, allowNull: false })
  currency: string;

  @ForeignKey(() => InvoiceDeveloper)
  @Column({ type: DataType.INTEGER })
  invoiceDevId: number;

  @BelongsTo(() => InvoiceDeveloper)
  invoiceDeveloper: InvoiceDeveloper;
}
