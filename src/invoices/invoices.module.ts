import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { InvoicesController } from './invoices.controller';
import { InvoicesService } from './services/invoices.service';
import { Invoice } from './models/invoice.model';
import { Salary } from 'src/salaries/model/salary.model';
import { InvoiceSalary } from './models/invoiceSalary.model';
import { IncomesModule } from 'src/incomes/incomes.module';
import { ClientsModule } from 'src/clients/clients.module';
import { SalariesModule } from 'src/salaries/salaries.module';
import { SalariesService } from 'src/salaries/salaries.service';
import { InvoiceSalariesService } from './services/invoiceSalaries.service';

@Module({
  imports: [
    SalariesModule,
    IncomesModule,
    ClientsModule,
    SequelizeModule.forFeature([Invoice, InvoiceSalary, Salary]),
  ],
  controllers: [InvoicesController],
  providers: [InvoicesService, InvoiceSalariesService, SalariesService],
})
export class InvoicesModule {}
