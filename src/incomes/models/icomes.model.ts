import { Column, DataType, Model, Table } from 'sequelize-typescript';

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
    allowNull: false,
  })
  currency: string;

  @Column({
    type: DataType.DATE,
    allowNull: false,
  })
  month: string;
}
