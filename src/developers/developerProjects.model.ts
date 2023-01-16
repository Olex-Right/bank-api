import {
  Model,
  Column,
  DataType,
  ForeignKey,
  Table,
} from 'sequelize-typescript';
import { Project } from 'src/projects/project.model';
import { Developer } from './developer.model';

@Table({ tableName: 'developer_projects'})
export class DeveloperProjects extends Model<DeveloperProjects> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id?: number;

  @ForeignKey(() => Developer)
  @Column({ type: DataType.INTEGER, allowNull: false })
  developerId: number;

  @ForeignKey(() => Project)
  @Column({ type: DataType.INTEGER, allowNull: false })
  projectId: number;
}
