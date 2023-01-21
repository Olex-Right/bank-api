import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { DevelopersModule } from 'src/developers/developers.module';
import { InvoicesController } from './invoices.controller';
import { InvoicesService } from './invoices.service';
import { Invoice } from './models/invoice.model';
import { InvoiceDeveloper } from './models/invoiceDeveloper.model';
import { InvoiceDevSalary } from './models/invoiceDevSalary.model';

@Module({
  imports: [DevelopersModule, SequelizeModule.forFeature([Invoice, InvoiceDeveloper, InvoiceDevSalary])],
  controllers: [InvoicesController],
  providers: [InvoicesService],
})
export class InvoicesModule {}
