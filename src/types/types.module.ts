import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Expense } from 'src/expenses/model/expense.model';
import { Type } from './model/type.model';
import { TypesController } from './types.controller';
import { TypesService } from './types.service';

@Module({
  imports: [SequelizeModule.forFeature([Expense, Type])],
  controllers: [TypesController],
  providers: [TypesService],
  exports: [TypesService],
})
export class TypesModule {}
