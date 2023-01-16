import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { IncomesController } from './incomes.controller';
import { IncomesService } from './incomes.service';
import { Income } from './models/icomes.model';
import { PlannedIncome } from './models/PlannedIncomes.model';
import { PlannedIncomesService } from './services/plannedIncomes.service';

@Module({
  controllers: [IncomesController],
  providers: [IncomesService, PlannedIncomesService],
  imports:[
    SequelizeModule.forFeature([Income, PlannedIncome])
  ]
})
export class IncomesModule {}
