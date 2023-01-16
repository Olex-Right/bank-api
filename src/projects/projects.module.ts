import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Developer } from 'src/developers/developer.model';
import { DeveloperProjects } from 'src/developers/developerProjects.model';
import { Project } from './project.model';
import { ProjectsController } from './projects.controller';
import { ProjectsService } from './projects.service';

@Module({
  controllers: [ProjectsController],
  providers: [ProjectsService],
  imports: [
    SequelizeModule.forFeature([Developer, Project, DeveloperProjects]),
  ],
})
export class ProjectsModule {}