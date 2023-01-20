import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { Developer } from 'src/developers/developer.model';
import { Type } from '../../types/model/type.model';

@Table({ tableName: 'expenses' })
export class Expense extends Model<Expense> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id?: number;

  @Column({ type: DataType.INTEGER, allowNull: false })
  value: number;

  @Column({ type: DataType.STRING, defaultValue: 'USD' })
  currency: string;

  @Column({ type: DataType.DATE })
  dateOfExpense: Date;

  @ForeignKey(() => Developer)
  developerId: number;

  @BelongsTo(() => Developer)
  developer?: Developer;

  @ForeignKey(() => Type)
  typeId: number;

  @BelongsTo(() => Type)
  type: Type;
}
 