import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { Invoice } from 'src/invoices/models/invoice.model';

@Table({ tableName: 'icomes' })
export class Income extends Model<Income> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id?: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  value: number;

  @Column({
    type: DataType.STRING,
    defaultValue: 'USD',
  })
  currency: string;

  @Column({
    type: DataType.DATE,
    defaultValue: DataType.NOW,
  })
  dateOfIncome: Date;

  @Column({
    type: DataType.INTEGER,
    defaultValue: new Date().getMonth(),
  })
  monthIndex: number;

  @ForeignKey(() => Invoice)
  invoiceId: Invoice;

  @BelongsTo(() => Invoice)
  invoice: Invoice;
}
