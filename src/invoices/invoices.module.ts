import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { DevelopersModule } from 'src/developers/developers.module';
import { InvoicesController } from './invoices.controller';
import { InvoicesService } from './services/invoices.service';
import { Invoice } from './models/invoice.model';
import { InvoiceDeveloper } from './models/invoiceDeveloper.model';
import { InvoiceDevSalary } from './models/invoiceDevSalary.model';
import { InvoiceDevsService } from './services/invoiceDevs.service';
import { InvoiceDevSalsService } from './services/invoiceDevSals.service';
import { IncomesModule } from 'src/incomes/incomes.module';
import { ClientsModule } from 'src/clients/clients.module';

@Module({
  imports: [
    DevelopersModule,
    IncomesModule,
    ClientsModule,
    SequelizeModule.forFeature([Invoice, InvoiceDeveloper, InvoiceDevSalary]),
  ],
  controllers: [InvoicesController],
  providers: [InvoicesService, InvoiceDevsService, InvoiceDevSalsService],
})
export class InvoicesModule {}
