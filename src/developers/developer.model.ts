import {
  Model,
  Column,
  DataType,
  Table,
  BelongsToMany,
  HasMany,
  BelongsTo,
  ForeignKey,
} from 'sequelize-typescript';
import { Expense } from 'src/expenses/model/expense.model';
import { InvoiceSalary } from 'src/invoices/models/invoiceSalary.model';
import { Project } from 'src/projects/project.model';
import { ProjectDeveloper } from 'src/projects/projectDeveloper.model';

@Table({ tableName: 'developers' })
export class Developer extends Model<Developer> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({
    type: DataType.STRING,
  })
  firstname: string;

  @Column({
    type: DataType.STRING,
  })
  lastname: string;

  @Column({
    type: DataType.STRING,
  })
  position: string;

  @HasMany(() => Expense)
  expenses: Expense[];

  @ForeignKey(() => InvoiceSalary)
  invoiceSalaryId: string;

  @BelongsTo(() => InvoiceSalary)
  invoiceSalary: InvoiceSalary[];

  @BelongsToMany(() => Project, () => ProjectDeveloper)
  projects: Project[];
}
