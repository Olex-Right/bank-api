import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Expense } from 'src/expenses/model/expense.model';
import { Project } from 'src/projects/project.model';
import { Developer } from './developer.model';
import { DevelopersController } from './developers.controller';
import { DevelopersService } from './developers.service';

@Module({
  controllers: [DevelopersController],
  providers: [DevelopersService],
  imports: [SequelizeModule.forFeature([Developer, Project, Expense])],
  exports: [DevelopersService],
})
export class DevelopersModule {}
