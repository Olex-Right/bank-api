import { Column, DataType, HasMany, Model, Table } from 'sequelize-typescript';
import { Invoice } from 'src/invoices/models/invoice.model';

@Table({ tableName: 'clients' })
export class Client extends Model<Client> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id?: number;

  @Column({ type: DataType.STRING })
  firstname: string;

  @Column({ type: DataType.STRING })
  lastname: string;

  @HasMany(() => Invoice)
  invoices: Invoice[];
}
