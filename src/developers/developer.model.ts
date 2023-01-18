import {
  Model,
  Column,
  DataType,
  Table,
  BelongsTo,
  ForeignKey,
} from 'sequelize-typescript';
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

  @ForeignKey(() => ProjectDeveloper)
  @Column({ type: DataType.INTEGER })
  projectDeveloperId: number;

  @BelongsTo(() => ProjectDeveloper)
  project: ProjectDeveloper;
}
