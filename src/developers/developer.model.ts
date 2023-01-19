import {
  Model,
  Column,
  DataType,
  Table,
  BelongsToMany,
} from 'sequelize-typescript';
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

  @BelongsToMany(() => Project, () => ProjectDeveloper)
  projects: Project[];
}
