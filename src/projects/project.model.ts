import {
  Model,
  BelongsToMany,
  Column,
  DataType,
  Table,
} from 'sequelize-typescript';
import { Developer } from 'src/developers/developer.model';
import { DeveloperProjects } from 'src/developers/developerProjects.model';

interface ProjectCreationAttribute {
  value: string;
}

@Table({ tableName: 'projects' })
export class Project extends Model<Project, ProjectCreationAttribute> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({ type: DataType.STRING, allowNull: false })
  value: string;

  @BelongsToMany(() => Developer, () => DeveloperProjects)
  developers: Developer[];
}
