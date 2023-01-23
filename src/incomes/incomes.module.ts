import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { IncomesController } from './incomes.controller';
import { IncomesService } from './incomes.service';
import { Income } from './models/icomes.model';

@Module({
  imports: [SequelizeModule.forFeature([Income])],
  controllers: [IncomesController],
  providers: [IncomesService],
  exports: [IncomesService],
})
export class IncomesModule {}
