import { Injectable } from '@nestjs/common';
import { Inject } from '@nestjs/common/decorators';
import { InjectModel } from '@nestjs/sequelize';
import { DevelopersService } from 'src/developers/developers.service';
import { IService } from 'src/globalInterfaces';
import { CreateProjectDto } from './dto/create-project.dto';
import { IDeveloperInfo, Project } from './project.model';
import { ProjectDeveloperService } from './projectDeveloperService.service';

interface IProjectsService extends IService<CreateProjectDto, Project> {
  addDeveloper: (
    projectId: number,
    developerInfo: IDeveloperInfo,
  ) => Promise<Project>;
}

@Injectable()
export class ProjectsService implements IProjectsService {
  constructor(
    @Inject(DevelopersService)
    private readonly developersService: DevelopersService,

    @Inject(ProjectDeveloperService)
    private readonly projectDeveloperService: ProjectDeveloperService,

    @InjectModel(Project) private projectsRepository: typeof Project,
  ) {}

  async create(dto: CreateProjectDto) {
    return await this.projectsRepository.create(dto);
  }

  async getAll() {
    return await this.projectsRepository.findAll();
  }

  async getOneById(id: number) {
    return await this.projectsRepository.findByPk(id, {
      include: { all: true },
    });
    // return await this.projectsRepository.findByPk(id, {include: [{model: Developer}]});
  }

  async updateOneById(id: number, dto: CreateProjectDto) {
    const project = await this.projectsRepository.findByPk(id);
    project.set({ ...dto });
    project.save();

    return project;
  }

  async addDeveloper(projectId: number, developerInfo: IDeveloperInfo) {
    const project = await this.projectsRepository.findByPk(projectId, {
      include: { all: true },
    });

    const developer = await this.developersService.getOneById(
      developerInfo.developerId,
    );

    const isCurrentExists = await this.projectDeveloperService.isExists(
      projectId,
      developerInfo.developerId,
    );

    if (isCurrentExists) {
      return project;
    }

    await this.projectDeveloperService.create({
      projectId,
      developerId: developer.id,
      developerPrice: developerInfo.developerPrice,
      priceCurrency: developerInfo.currencyType,
    });

    return project;
  }

  async deleteOneById(id: number) {
    await (await this.projectsRepository.findByPk(id)).destroy();
  }
}
