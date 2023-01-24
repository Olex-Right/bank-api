import {
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Controller,
} from '@nestjs/common';
import { CreateInvoiceDto } from './dto/create-invoice.dto';
import { InvoicesService } from './services/invoices.service';
import { CreateInvoiceSalaryDto } from './dto/create-invoiceSalary.dto';
import { InvoiceSalariesService } from './services/invoiceSalaries.service';

@Controller('invoices')
export class InvoicesController {
  constructor(
    private invoicesService: InvoicesService,
    private invoiceSalariesService: InvoiceSalariesService,
  ) {}

  @Post('')
  createInvoice(@Body() invoiceDto: CreateInvoiceDto) {
    return this.invoicesService.create(invoiceDto);
  }

  @Post('/salary')
  createSlary(@Body() invoiceSalaryDto: CreateInvoiceSalaryDto) {
    return this.invoiceSalariesService.create(invoiceSalaryDto);
  }

  @Get('/salary')
  getAllSalaries() {
    return this.invoiceSalariesService.getAll();
  }

  @Get('')
  getAllInvoices() {
    return this.invoicesService.getAll();
  }

  @Get('/:id')
  getByIdInvoice(@Param('id') id: number) {
    return this.invoicesService.getOneById(id);
  }

  @Put('update/:id')
  updateByIdInvoice(
    @Param('id') id: number,
    @Body() invoiceDto: CreateInvoiceDto,
  ) {
    return this.invoicesService.updateOneById(id, invoiceDto);
  }

  @Delete('delete/:id')
  deleteByIdInvoice(@Param('id') id: number) {
    return this.invoicesService.deleteOneById(id);
  }
}
