import {
  Body,
  Controller,
  Post,
  Get,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { CreateSalaryDto } from './dto/create-salary.dto';
import { SalariesService } from './salaries.service';

@Controller('salaries')
export class SalariesController {
  constructor(private salariesService: SalariesService) {}

  @Post('')
  createSalary(@Body() salaryDto: CreateSalaryDto) {
    return this.salariesService.create(salaryDto);
  }

  @Get('')
  getAllSalarys() {
    return this.salariesService.getAll();
  }

  @Get('/:id')
  getByIdSalary(@Param('id') id: number) {
    return this.salariesService.getOneById(id);
  }

  @Put('update/:id')
  updateByIdSalary(
    @Param('id') id: number,
    @Body() salaryDto: CreateSalaryDto,
  ) {
    console.log('im in update contr');

    return this.salariesService.updateOneById(id, salaryDto);
  }

  @Delete('delete/:id')
  deleteByIdIncome(@Param('id') id: number) {
    return this.salariesService.deleteOneById(id);
  }
}
