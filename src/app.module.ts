import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { IncomesModule } from './incomes/incomes.module';
import { Income } from './incomes/models/icomes.model';
import { PlannedIncome } from './incomes/models/PlannedIncomes.model';
import { DevelopersModule } from './developers/developers.module';
import { ProjectsModule } from './projects/projects.module';
import { Developer } from './developers/developer.model';
import { Project } from './projects/project.model';
import { DeveloperProjects } from './developers/developerProjects.model';

@Module({
  imports: [
    SequelizeModule.forFeature([Income, PlannedIncome, Developer, Project, DeveloperProjects]),
    ConfigModule.forRoot({ envFilePath: `.${process.env.NODE_ENV}.env` }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: +process.env.POSTGRES_PORT,
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      models: [],
      autoLoadModels: true,
    }),
    IncomesModule,
    DevelopersModule,
    ProjectsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
