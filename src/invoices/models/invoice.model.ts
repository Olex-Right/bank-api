import {
  BelongsTo,
  BelongsToMany,
  Column,
  DataType,
  ForeignKey,
  HasMany,
  HasOne,
  Model,
  Table,
} from 'sequelize-typescript';
import { Client } from 'src/clients/model/client.model';
import { Developer } from 'src/developers/developer.model';
import { Income } from 'src/incomes/models/icomes.model';
import { InvoiceDeveloper } from './invoiceDeveloper.model';

export type InvoiceStatus = 'opened' | 'closed' | 'overdue';
export type InvoiceSalType = 'employeeHours' | 'projectHours' | 'taskHours';

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

  @Column({ type: DataType.STRING, defaultValue: 'opened' })
  invoiceStatus: InvoiceStatus;

  @Column({ type: DataType.STRING })
  invoiceSalType: InvoiceSalType;

  @HasMany(() => InvoiceDeveloper)
  invoiceDevs: InvoiceDeveloper[];

  @BelongsToMany(() => Developer, () => InvoiceDeveloper)
  developers: Developer[];

  @HasOne(() => Income)
  income: Income;

  @ForeignKey(() => Client)
  clientId: number;

  @BelongsTo(() => Client)
  client: Client;
}
