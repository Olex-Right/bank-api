import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateProjectDeveloperDto } from './dto/create-projectDeveloper.dto';
import { ProjectDeveloper } from './projectDeveloper.model';

interface IProjDevService {
  create: (dto: CreateProjectDeveloperDto) => Promise<ProjectDeveloper>;
  getAll: () => Promise<ProjectDeveloper[]>;
  getOne: (projId: number, devId: number) => Promise<ProjectDeveloper>;
  isExists: (projId: number, devId: number) => Promise<boolean>;
}

@Injectable()
export class ProjectDeveloperService implements IProjDevService {
  constructor(
    @InjectModel(ProjectDeveloper)
    private projectDeveloperRepository: typeof ProjectDeveloper,
  ) {}

  async create(dto: CreateProjectDeveloperDto) {
    return await this.projectDeveloperRepository.create(dto);
  }

  async getAll() {
    return await this.projectDeveloperRepository.findAll({
      include: { all: true },
    });
  }

  async getOne(projId: number, devId: number) {
    console.log('trying into get One \n\n\n\n', projId, devId, '\n');
    return await this.projectDeveloperRepository.findOne({
      where: { projectId: projId, developerId: devId },
    });
  }

  async isExists(projId: number, devId: number) {
    console.log('trying into get One \n\n\n\n', projId, devId, '\n');
    const projDev = await this.projectDeveloperRepository.findOne({
      where: { projectId: projId, developerId: devId },
    });
    return projDev ? true : false;
  }
}
