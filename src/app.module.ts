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
import { ProjectDeveloper } from './projects/projectDeveloper.model';
import { ExpensesModule } from './expenses/expenses.module';
import { Expense } from './expenses/model/expense.model';
import { Type } from './types/model/type.model';
import { TypesModule } from './types/types.module';
import { InvoicesModule } from './invoices/invoices.module';

@Module({
  imports: [
    SequelizeModule.forFeature([
      Expense,
      Type,
      Income,
      PlannedIncome,
      Developer,
      Project,
      ProjectDeveloper,
    ]),
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
    ExpensesModule,
    TypesModule,
    InvoicesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
