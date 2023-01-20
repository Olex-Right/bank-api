import {
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { Developer } from 'src/developers/developer.model';
import { Invoice } from './invoice.model';

@Table({ tableName: 'invoice_developer' })
export class InvoiceDeveloper extends Model<InvoiceDeveloper> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({ type: DataType.INTEGER })
  developerSalary: number;

  @Column({ type: DataType.STRING })
  currency: string;

  @ForeignKey(() => Invoice)
  @Column({ type: DataType.INTEGER})
  invoiceId: number;

  @ForeignKey(() => Developer)
  @Column({ type: DataType.INTEGER})
  developerId: number;
}