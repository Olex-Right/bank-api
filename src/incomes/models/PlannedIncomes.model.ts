import { Column, DataType, Table } from 'sequelize-typescript';
import { Income } from './icomes.model';

@Table({ tableName: 'plannedIncomes' })
export class PlannedIncome extends Income {
  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  })
  isPlanned: boolean;
}
