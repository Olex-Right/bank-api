import { Injectable } from '@nestjs/common';
import { Inject } from '@nestjs/common/decorators';
import { InjectModel } from '@nestjs/sequelize';
import { Developer } from 'src/developers/developer.model';
import { DevelopersService } from 'src/developers/developers.service';
import { IService } from 'src/globalInterfaces';
import { CreateInvoiceDto } from '../dto/create-invoice.dto';
import { Invoice } from '../models/invoice.model';
import { InvoiceDeveloper } from '../models/invoiceDeveloper.model';
import { InvoiceDevSalary } from '../models/invoiceDevSalary.model';
import { InvoiceDevsService } from './invoiceDevs,service';

interface IInvoicesService extends IService<CreateInvoiceDto, Invoice> {}

@Injectable()
export class InvoicesService implements IInvoicesService {
  constructor(
    @InjectModel(Invoice) private invoiceRepository: typeof Invoice,

    @Inject(InvoiceDevsService)
    private readonly invoiceDevsService: InvoiceDevsService,

    @Inject(DevelopersService)
    private readonly developersService: DevelopersService,
  ) {}

  async create(dto: CreateInvoiceDto) {
    const invoice = await this.invoiceRepository.create(dto);
    const developers: Developer[] = await this.developersService.getManyByIds(
      dto.invoiceDevSalDto.map((dto) => {
        return dto.invoiceDevId;
      }),
    );

    await invoice.$set('developers', developers);
    await invoice.save();

    dto.invoiceDevSalDto.forEach(async (dto) => {
      await this.invoiceDevsService.addDevSalary(invoice.id, {
        invoiceDevId: dto.invoiceDevId,
        salaryValue: dto.salaryValue,
        currency: dto.currency,
      });
    });

    return invoice;
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
