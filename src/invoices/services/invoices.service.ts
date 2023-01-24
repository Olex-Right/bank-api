import { Injectable } from '@nestjs/common';
import { Inject } from '@nestjs/common/decorators';
import { InjectModel } from '@nestjs/sequelize';
import { IService } from 'src/globalInterfaces';
import { IncomesService } from 'src/incomes/incomes.service';
import { Salary } from 'src/salaries/model/salary.model';
import { Invoice } from '../models/invoice.model';
import { InvoiceSalary } from '../models/invoiceSalary.model';
import { CreateInvoiceDto } from '../dto/create-invoice.dto';
import { ClientsService } from 'src/clients/clients.service';
import { InvoiceSalariesService } from './invoiceSalaries.service';

interface IInvoicesService extends IService<CreateInvoiceDto, Invoice> {}

@Injectable()
export class InvoicesService implements IInvoicesService {
  constructor(
    @InjectModel(Invoice) private invoiceRepository: typeof Invoice,

    @Inject(InvoiceSalariesService)
    private readonly invoiceSalariesService: InvoiceSalariesService,

    @Inject(IncomesService)
    private readonly incomesService: IncomesService,

    @Inject(ClientsService)
    private readonly clientsService: ClientsService,
  ) {}

  async create(dto: CreateInvoiceDto) {
    const invoice = await this.invoiceRepository.create(dto);

    //add InvoiceSalaries to Invoice
    const invoiceSalaries: InvoiceSalary[] =
      await this.invoiceSalariesService.createMany(dto.invoiceSalaryDtos);

    await invoice.$set('invoiceSalaries', invoiceSalaries);
    await invoice.save();

    //add Income to Invoice
    const income = await this.incomesService.create({
      value: dto.value,
      currency: dto.currency,
      dateOfIncome: dto.dateOfDue,
    });
    await invoice.$set('income', income);
    await invoice.save();

    //add Invoice to Client
    const client = await this.clientsService.getOneById(dto.clientId);
    client.$add('invoices', invoice);
    await client.save();

    return invoice;
  }

  async getAll() {
    return await this.invoiceRepository.findAll({
      // include: [
      //   {
      //     model: InvoiceDeveloper,
      //     include: [InvoiceDevSalary],
      //   },
      //   { model: Developer, through: { attributes: [] } },
      // ],
      include: { all: true },
    });
  }

  async getOneById(id: number) {
    return await this.invoiceRepository.findByPk(id, {
      include: [
        {
          model: InvoiceSalary,
          include: [Salary],
        },
        { all: true },
        // { model: Developer, through: { attributes: [] } },
      ],
      // include: { all: true },
    });
  }

  async updateOneById(id: number, dto: CreateInvoiceDto) {
    const invoice = await this.invoiceRepository.findByPk(id);
    invoice.set({ ...dto });
    invoice.save();

    return invoice;
  }

  async deleteOneById(id: number) {
    await (await this.invoiceRepository.findByPk(id)).destroy();
  }
}
