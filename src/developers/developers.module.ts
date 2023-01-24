import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Expense } from 'src/expenses/model/expense.model';
import { Project } from 'src/projects/project.model';
import { Developer } from './developer.model';
import { DevelopersController } from './developers.controller';
import { DevelopersService } from './developers.service';

@Module({
  imports: [
    SequelizeModule.forFeature([Developer, Project, Expense]),
  ],
  controllers: [DevelopersController],
  providers: [DevelopersService],
  exports: [DevelopersService],
})
export class DevelopersModule {}
