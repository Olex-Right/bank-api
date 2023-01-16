import {
  Body,
  Controller,
  Post,
  Get,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { CreateIncomeDto } from './dto/create-income.dto';
import { IncomesService } from './incomes.service';
import { PlannedIncomesService } from './services/plannedIncomes.service';

@Controller('incomes')
export class IncomesController {
  constructor(
    private incomeService: IncomesService,
    private plannedIncomeService: PlannedIncomesService,
  ) {}

  @Post('')
  createIncome(@Body() incomeDto: CreateIncomeDto) {
    return this.incomeService.create(incomeDto);
  }
  
  @Post('planned')
  createPlannedIncome(@Body() incomeDto: CreateIncomeDto) {
    return this.plannedIncomeService.create(incomeDto);
  }
  @Get('planned')
  getAllPlannedIncomes() {
    return this.plannedIncomeService.getAll();
  }
  @Get('plannedtest')
  getPlannedTest(){
    return this.plannedIncomeService.getNumber3();
  }

  @Get('')
  getAllIncomes() {
    return this.incomeService.getAll();
  }

  @Get('/:id')
  getByIdIncome(@Param('id') id: string) {
    console.log('id', id);
    return this.incomeService.getOneById(id);
  }

  @Put('update/:id')
  updateByIdIncome(
    @Param('id') id: string,
    @Body() incomeDto: CreateIncomeDto,
  ) {
    console.log('im in update contr');

    return this.incomeService.updateOneById(id, incomeDto);
  }

  @Delete('delete/:id')
  deleteByIdIncome(@Param('id') id: string) {
    return this.incomeService.deleteOneById(id);
  }
}
