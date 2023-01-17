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
  name: string;
  value: number;
  developers: DeveloperValue[];
}

export interface IDeveloperInfo {
  developerId: string;
  devValue: number;
  valueType?: string;
}

export interface DeveloperValue {
  developer: Developer;
  devValue: number;
  valueType?: string;
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
  name: string;

  @Column({ type: DataType.INTEGER, allowNull: false })
  value: number;

  @BelongsToMany(() => Developer, () => DeveloperProjects)
  developers: DeveloperValue[];
}