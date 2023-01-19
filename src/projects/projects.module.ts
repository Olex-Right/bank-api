import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Developer } from 'src/developers/developer.model';
import { DevelopersModule } from 'src/developers/developers.module';
import { Project } from './project.model';
import { ProjectDeveloper } from './projectDeveloper.model';
import { ProjectDeveloperService } from './projectDeveloperService.service';
import { ProjectsController } from './projects.controller';
import { ProjectsService } from './projects.service';

@Module({
  controllers: [ProjectsController],
  providers: [ProjectsService, ProjectDeveloperService],
  imports: [
    DevelopersModule,
    SequelizeModule.forFeature([Developer, Project, ProjectDeveloper]),
  ],
})
export class ProjectsModule {}
