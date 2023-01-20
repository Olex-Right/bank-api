import {Get, Post, Put, Delete, Body, Param, Controller } from '@nestjs/common';
import { CreateTypeDto } from './dto/create-type.dto';
import { TypesService } from './types.service';

@Controller('types')
export class TypesController {
  constructor(
    private typesService: TypesService,
  ) {}

  @Post('')
  createExpense(@Body() expenseDto: CreateTypeDto) {
    return this.typesService.create(expenseDto);
  }
  
  @Get('')
  getAllExpenses() {
    return this.typesService.getAll();
  }

  @Get('/:id')
  getByIdExpense(@Param('id') id: number) {
    return this.typesService.getOneById(id);
  }

  @Put('update/:id')
  updateByIdExpense(
    @Param('id') id: number,
    @Body() typeDto: CreateTypeDto,
  ) {
    return this.typesService.updateOneById(id, typeDto);
  }

  @Delete('delete/:id')
  deleteByIdExpense(@Param('id') id: number) {
    return this.typesService.deleteOneById(id);
  }
}
