import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ExpensesController } from './expenses.controller';
import { ExpensesService } from './expenses.service';
import { Expense } from './model/expense.model';
import { Type } from '../types/model/type.model';
import { TypesModule } from 'src/types/types.module';

@Module({
  imports: [TypesModule, SequelizeModule.forFeature([Expense, Type])],
  controllers: [ExpensesController],
  providers: [ExpensesService],
})
export class ExpensesModule {}
