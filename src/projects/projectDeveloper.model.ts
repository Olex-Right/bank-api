import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  HasOne,
  Model,
  Table,
} from 'sequelize-typescript';
import { Developer } from 'src/developers/developer.model';
import { Project } from './project.model';

@Table({ tableName: 'project_developer' })
export class ProjectDeveloper extends Model<ProjectDeveloper> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({ type: DataType.INTEGER })
  developerPrice: number;

  @Column({ type: DataType.STRING })
  priceCurrency: string;

  @ForeignKey(() => Project)
  @Column({ type: DataType.INTEGER})
  projectId: number;

  @ForeignKey(() => Developer)
  @Column({ type: DataType.INTEGER})
  developerId: number;

  @BelongsTo(() => Project)
  project: Project;
}