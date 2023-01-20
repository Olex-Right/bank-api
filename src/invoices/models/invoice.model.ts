import { Column, DataType, Model, Table } from 'sequelize-typescript';

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

  @Column({ type: DataType.BOOLEAN, allowNull: false, defaultValue: false })
  isClosed: boolean;

  @Column({ type: DataType.DATE })
  dateOfOpen: Date;

  @Column({ type: DataType.DATE })
  dateOfDue: Date;

  @Column({ type: DataType.DATE })
  dateOfClose: Date;

  @Column({ type: DataType.STRING })
  currency: string;

  @Column({ type: DataType.STRING })
  invoiceType: 'employeeHours' | 'projectHours' | 'TaskHours';

  //Element depend on type
}
