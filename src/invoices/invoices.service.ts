import { Injectable } from '@nestjs/common';
import { Inject } from '@nestjs/common/decorators';
import { InjectModel } from '@nestjs/sequelize';
import { Developer } from 'src/developers/developer.model';
import { DevelopersService } from 'src/developers/developers.service';
import { IService } from 'src/globalInterfaces';
import { CreateInvDevSalaryDto } from './dto/create-invDevSalary.dto';
import { CreateInvoiceDto } from './dto/create-invoice.dto';
import { Invoice } from './models/invoice.model';
import { InvoiceDeveloper } from './models/invoiceDeveloper.model';
import { InvoiceDevSalary } from './models/invoiceDevSalary.model';

interface IInvoicesService extends IService<CreateInvoiceDto, Invoice> {
  getInvDevByInfo: (
    invoiceId: number,
    developerId: number,
  ) => Promise<InvoiceDeveloper>;
}

@Injectable()
export class InvoicesService implements IInvoicesService {
  constructor(
    @InjectModel(Invoice) private invoiceRepository: typeof Invoice,
    @InjectModel(InvoiceDeveloper)
    private invoiceDeveloperRepository: typeof InvoiceDeveloper,
    @InjectModel(InvoiceDevSalary)
    private invoiceDevSalaryRepository: typeof InvoiceDeveloper,
    @Inject(DevelopersService)
    private readonly developersService: DevelopersService,
  ) {}

  async create(dto: CreateInvoiceDto) {
    const invoice = await this.invoiceRepository.create(dto);
    const developers: Developer[] = await this.developersService.getManyByIds(
      dto.developersInfo.map((devInfo) => {
        return devInfo.developerId;
      }),
    );

    await invoice.$set('developers', developers);
    await invoice.save();

    dto.developersInfo.forEach(async (devInfo) => {
      const invoiceDev = await this.getInvDevByInfo(
        invoice.id,
        devInfo.developerId,
      );

      const invDevSalary = await this.createInvDevSalary({
        invoiceDevId: invoiceDev.id,
        salaryValue: devInfo.developerSalary,
        currency: devInfo.currency,
        typeOfSalary: devInfo.typeOfSalary,
      });

      await invoiceDev.$set('invoiceDevSalary', invDevSalary);
      await invoiceDev.save();
    });

    return invoice;
  }

  async createInvDevSalary(invDevSalaryDto: CreateInvDevSalaryDto) {
    return await this.invoiceDevSalaryRepository.create(invDevSalaryDto);
  }

  async getAll() {
    return await this.invoiceRepository.findAll({
      include: [
        {
          model: InvoiceDeveloper,
          include: [InvoiceDevSalary],
        },
        { model: Developer, through: { attributes: [] } },
      ],
    });
  }

  async getOneById(id: number) {
    return await this.invoiceRepository.findByPk(id, {
      include: [
        {
          model: InvoiceDeveloper,
          include: [InvoiceDevSalary],
        },
        { model: Developer, through: { attributes: [] } },
      ],
    });
  }

  async getInvDevById(id: number) {
    return await this.invoiceDeveloperRepository.findByPk(id, {
      include: { all: true },
    });
  }

  async getAllInvDevs() {
    return await this.invoiceDeveloperRepository.findAll({
      include: { all: true },
    });
  }

  async getInvDevByInfo(invoiceId: number, developerId: number) {
    return await this.invoiceDeveloperRepository.findOne({
      where: { invoiceId, developerId },
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
