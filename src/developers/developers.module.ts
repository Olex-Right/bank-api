import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Project } from 'src/projects/project.model';
import { Developer } from './developer.model';
import { DeveloperProjects } from './developerProjects.model';
import { DevelopersController } from './developers.controller';
import { DevelopersService } from './developers.service';

@Module({
  controllers: [DevelopersController],
  providers: [DevelopersService],
  imports: [
    SequelizeModule.forFeature([Developer, Project, DeveloperProjects]),
  ],
})
export class DevelopersModule {}
