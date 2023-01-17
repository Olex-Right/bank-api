import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Developer } from 'src/developers/developer.model';
import { DeveloperProjects } from 'src/developers/developerProjects.model';
import { DevelopersModule } from 'src/developers/developers.module';
import { Project } from './project.model';
import { ProjectsController } from './projects.controller';
import { ProjectsService } from './projects.service';

@Module({
  controllers: [ProjectsController],
  providers: [ProjectsService],
  imports: [
    DevelopersModule, 
    SequelizeModule.forFeature([Developer, Project, DeveloperProjects]),
  ],
})
export class ProjectsModule {}
