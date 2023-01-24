import { Injectable } from '@nestjs/common';
import { Inject } from '@nestjs/common/decorators';
import { InjectModel } from '@nestjs/sequelize';
import { SalariesService } from 'src/salaries/salaries.service';
import { CreateInvoiceSalaryDto } from '../dto/create-invoiceSalary.dto';
import { InvoiceSalary } from '../models/invoiceSalary.model';

interface IInvoiceSalariesService {
  create: (dto: CreateInvoiceSalaryDto) => Promise<InvoiceSalary>;
  createMany: (dtos: CreateInvoiceSalaryDto[]) => Promise<InvoiceSalary[]>;
  getAll: () => Promise<InvoiceSalary[]>;
}

@Injectable()
export class InvoiceSalariesService implements IInvoiceSalariesService {
  constructor(
    @InjectModel(InvoiceSalary)
    private invoiceSalaryRepository: typeof InvoiceSalary,
    @Inject(SalariesService)
    private readonly salariesService: SalariesService,
  ) {}

  async getAll() {
    return await this.invoiceSalaryRepository.findAll({
      include: { all: true },
    });
  }

  async create(dto: CreateInvoiceSalaryDto): Promise<InvoiceSalary> {
    const salary = await this.salariesService.create(dto);
    const invoiceSalary = await this.invoiceSalaryRepository.create();
    await invoiceSalary.$set('invoiceSalary', salary);

    return invoiceSalary;
  }

  async createMany(dtos: CreateInvoiceSalaryDto[]): Promise<InvoiceSalary[]> {
    const invoiceSalaries: InvoiceSalary[] = [];

    for (let i = 0; i < dtos.length; i++) {
      invoiceSalaries.push(await this.create(dtos[i]));
    }

    return invoiceSalaries;
  }
}
