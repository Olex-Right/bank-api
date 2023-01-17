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
import { ProjectsService } from './projects.service';


@Controller('projects')
export class ProjectsController {
  constructor(private projectsService: ProjectsService) {}

  @Post('')
  createProject(@Body() ProjectDto: CreateProjectDto) {
    return this.projectsService.create(ProjectDto);
  }

  @Get('')
  getAllProjects() {
    return this.projectsService.getAll();
  }

  @Get('/:id')
  getByIdProject(@Param('id') id: string) {
    console.log('id', id);
    return this.projectsService.getOneById(id);
  }

  @Put('update/:id')
  updateByIdProject(
    @Param('id') id: string,
    @Body() ProjectDto: CreateProjectDto,
  ) {
    console.log('im in update contr');

    return this.projectsService.updateOneById(id, ProjectDto);
  }

  @Put('addDeveloper/:id')
  addDevelopertoProject(
    @Param('id') projectId: string,
    @Body() developerValue: IDeveloperInfo,
  ) {
    return this.projectsService.addDeveloper(projectId, developerValue);
  }

  @Delete('delete/:id')
  deleteByIdProject(@Param('id') id: string) {
    return this.projectsService.deleteOneById(id);
  }
}
