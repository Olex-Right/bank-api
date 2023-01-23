import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Salary } from './model/salary.model';
import { SalariesController } from './salaries.controller';
import { SalariesService } from './salaries.service';

@Module({
  imports: [SequelizeModule.forFeature([Salary])],
  controllers: [SalariesController],
  providers: [SalariesService]
})
export class SalariesModule {}
