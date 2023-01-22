import { Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateInvDevSalDto } from '../dto/create-invDevSal.dto';
import { InvoiceDeveloper } from '../models/invoiceDeveloper.model';
import { InvoiceDevSalary } from '../models/invoiceDevSalary.model';
import { InvoiceDevSalsService } from './invoiceDevSals.service';

interface IInvoiceDevsService {
  getInvDevByInfo: (
    invoiceId: number,
    developerId: number,
  ) => Promise<InvoiceDeveloper>;

  addDevSalary: (
    invoiceId: number,
    invoiceDevSalDto: CreateInvDevSalDto,
  ) => Promise<InvoiceDeveloper>;
}

@Injectable()
export class InvoiceDevsService implements IInvoiceDevsService {
  constructor(
    @InjectModel(InvoiceDeveloper)
    private invoiceDeveloperRepository: typeof InvoiceDeveloper,

    @Inject(InvoiceDevSalsService)
    private readonly invoiceDevSalsService: InvoiceDevSalsService,
  ) {}


  async getInvDevByInfo(invoiceId: number, developerId: number) {
    return await this.invoiceDeveloperRepository.findOne({
      where: { invoiceId, developerId },
    });
  }

  async addDevSalary(invoiceId: number, invoiceDevSalDto: CreateInvDevSalDto) {
    try {
      const invDev = await this.getInvDevByInfo(
        invoiceId,
        invoiceDevSalDto.invoiceDevId,
      );

      const invDevSalary = await this.invoiceDevSalsService.create(
        invoiceDevSalDto,
      );

      await invDev.$set('invoiceDevSalary', invDevSalary);
      await invDev.save();

      return invDev;
    } catch (err) {
      console.log('\n\n\n\n New Error! \n\n\n\n');
    }
  }
}
