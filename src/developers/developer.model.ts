import {
  Model,
  BelongsToMany,
  Column,
  DataType,
  Table,
} from 'sequelize-typescript';
import { Project } from 'src/projects/project.model';
import { DeveloperProjects } from './developerProjects.model';

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
    allowNull: false,
  })
  position: string;

  @BelongsToMany(() => Project, () => DeveloperProjects)
  projects: Project[];
}
