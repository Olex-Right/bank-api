import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateInvDevSalDto } from '../dto/create-invDevSal.dto';
import { InvoiceDevSalary } from '../models/invoiceDevSalary.model';

interface IInvoiceDevSalsService {
  create: (invDevSalaryDto: CreateInvDevSalDto) => Promise<InvoiceDevSalary>;
}

@Injectable()
export class InvoiceDevSalsService implements IInvoiceDevSalsService {
  constructor(
    @InjectModel(InvoiceDevSalary)
    private invoiceDevSalRepository: typeof InvoiceDevSalary,
  ) {}

  async create(invDevSalaryDto: CreateInvDevSalDto) {
    return await this.invoiceDevSalRepository.create(invDevSalaryDto);
  }
}
