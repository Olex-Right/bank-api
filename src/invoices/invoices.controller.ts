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

@Controller('invoices')
export class InvoicesController {
  constructor(private invoicesService: InvoicesService) {}

  @Post('')
  createInvoice(@Body() invoiceDto: CreateInvoiceDto) {
    return this.invoicesService.create(invoiceDto);
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
