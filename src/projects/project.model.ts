import {
  Model,
  BelongsToMany,
  Column,
  DataType,
  Table,
  HasMany,
} from 'sequelize-typescript';
import { Developer } from 'src/developers/developer.model';
import { ProjectDeveloper } from './projectDeveloper.model';

interface ProjectCreationAttribute {
  name: string;
  value: number;
  developers: DeveloperValue[];
}

export interface IDeveloperInfo {
  developerId: number;
  developerPrice: number;
  currencyType?: string;
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

  @HasMany(() => ProjectDeveloper)
  projectDevelopers: ProjectDeveloper[];
}