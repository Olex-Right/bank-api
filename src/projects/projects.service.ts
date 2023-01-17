import { Injectable } from '@nestjs/common';
import { Inject } from '@nestjs/common/decorators';
import { InjectModel } from '@nestjs/sequelize';
import { DeveloperProjects } from 'src/developers/developerProjects.model';
import { DevelopersService } from 'src/developers/developers.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { IDeveloperInfo, Project } from './project.model';

interface IProjectsService {
  create: (dto: CreateProjectDto) => Promise<Project>;
  getAll: () => Promise<Project[]>;
  getOneById: (id: string) => Promise<Project>;
  updateOneById: (id: string, dto: CreateProjectDto) => Promise<Project>;
  addDeveloper: (
    projectId: string,
    developerInfo: IDeveloperInfo,
  ) => Promise<Project>;
  deleteOneById: (id: string) => void;
}

@Injectable()
export class ProjectsService implements IProjectsService {
  constructor(
    @Inject(DevelopersService)
    private readonly developersService: DevelopersService,
    @InjectModel(Project) private projectsRepository: typeof Project,
    @InjectModel(DeveloperProjects)
    private developerProjectsRepository: typeof DeveloperProjects,
  ) {}

  async create(dto: CreateProjectDto) {
    return await this.projectsRepository.create(dto);
  }

  async getAll() {
    return await this.projectsRepository.findAll({ include: { all: true } });
  }

  async getOneById(id: string) {
    return await this.projectsRepository.findByPk(id);
  }

  async updateOneById(id: string, dto: CreateProjectDto) {
    const project = await this.projectsRepository.findByPk(id);
    project.set({ ...dto });
    project.save();

    return project;
  }

  async addDeveloper(projectId: string, developerInfo: IDeveloperInfo) {
    const project = await this.projectsRepository.findByPk(projectId, {
      include: { all: true },
    });
    const developer = await this.developersService.getOneById(
      developerInfo.developerId,
    );
    console.log('underlying');
    project.$add('developers', developer);
    // project.set({
    //   ...project,
    //   developers: [
    //     {
    //       developer: developer,
    //       devValue: developerInfo.devValue,
    //       valueType: developerInfo.valueType,
    //     },
    //   ],
    // });
    project.save();
    return project;
  }

  async getDeveloperProjects(devId: string, projId: string) {
    const devProj = await this.developerProjectsRepository.findOne({
      where: { projectId: projId, developerId: devId },
      include: { all: true },
    });
    devProj.developerPrice = 34;
  }

  async deleteOneById(id: string) {
    await (await this.projectsRepository.findByPk(id)).destroy();
  }
}
