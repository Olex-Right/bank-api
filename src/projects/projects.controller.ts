import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CreateProjectDto } from './dto/create-project.dto';
import { IDeveloperInfo } from './project.model';
import { ProjectDeveloperService } from './projectDeveloperService.service';
import { ProjectsService } from './projects.service';

@Controller('projects')
export class ProjectsController {
  constructor(
    private projectsService: ProjectsService,
    private projectDevService: ProjectDeveloperService,
  ) {}

  @Post('')
  createProject(@Body() ProjectDto: CreateProjectDto) {
    return this.projectsService.create(ProjectDto);
  }

  @Get('')
  getAllProjects() {
    return this.projectsService.getAll();
  }

  @Get('/alls')
  getAllTest() {
    return this.projectDevService.getAll();
  }
  
  @Get('/:id')
  getByIdProject(@Param('id') id: number) {
    console.log('id', id);
    return this.projectsService.getOneById(id);
  }

  @Put('update/:id')
  updateByIdProject(
    @Param('id') id: number,
    @Body() ProjectDto: CreateProjectDto,
  ) {
    console.log('im in update contr');

    return this.projectsService.updateOneById(id, ProjectDto);
  }

  @Put('addDeveloper/:id')
  addDevelopertoProject(
    @Param('id') projectId: number,
    @Body() developerInfo: IDeveloperInfo,
  ) {
    return this.projectsService.addDeveloper(projectId, developerInfo);
  }

  @Delete('delete/:id')
  deleteByIdProject(@Param('id') id: number) {
    return this.projectsService.deleteOneById(id);
  }
}
