
import {Get, Post, Put, Delete, Body, Param, Controller } from '@nestjs/common';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { ExpensesService } from './expenses.service';

@Controller('expenses')
export class ExpensesController {
  constructor(
    private expensesService: ExpensesService,
  ) {}

  @Post('')
  createExpense(@Body() expenseDto: CreateExpenseDto) {
    return this.expensesService.create(expenseDto);
  }
  
  @Get('')
  getAllExpenses() {
    return this.expensesService.getAll();
  }

  @Get('/:id')
  getByIdExpense(@Param('id') id: number) {
    console.log('id', id);
    return this.expensesService.getOneById(id);
  }

  @Put('update/:id')
  updateByIdExpense(
    @Param('id') id: string,
    @Body() expenseDto: CreateExpenseDto,
  ) {
    return this.expensesService.updateOneById(id, expenseDto);
  }

  @Delete('delete/:id')
  deleteByIdExpense(@Param('id') id: string) {
    return this.expensesService.deleteOneById(id);
  }
}
