import { Column, DataType, HasMany, Model, Table } from 'sequelize-typescript';
import { Expense } from '../../expenses/model/expense.model';

@Table({ tableName: 'types' })
export class Type extends Model<Type> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id?: number;

  @Column({ type: DataType.STRING, unique: true })
  name: string;

  @Column({ type: DataType.STRING })
  group: string;

  @HasMany(() => Expense)
  expences: Expense[];
}
