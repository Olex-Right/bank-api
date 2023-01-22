import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { IncomesController } from './incomes.controller';
import { IncomesService } from './incomes.service';
import { Income } from './models/icomes.model';

@Module({
  controllers: [IncomesController],
  providers: [IncomesService],
  imports:[
    SequelizeModule.forFeature([Income])
  ]
})
export class IncomesModule {}
