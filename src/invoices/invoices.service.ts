import { Injectable } from '@nestjs/common';
import { Inject } from '@nestjs/common/decorators';
import { InjectModel } from '@nestjs/sequelize';
import { Developer } from 'src/developers/developer.model';
import { DevelopersService } from 'src/developers/developers.service';
import { IService } from 'src/globalInterfaces';
import { CreateInvoiceDto } from './dto/create-invoice.dto';
import { Invoice } from './models/invoice.model';

interface IInvoicesService extends IService<CreateInvoiceDto, Invoice> {}

@Injectable()
export class InvoicesService implements IInvoicesService {
  constructor(
    @InjectModel(Invoice) private invoiceRepository: typeof Invoice,
    @Inject(DevelopersService)
    private readonly developersService: DevelopersService,
  ) {}

  async create(dto: CreateInvoiceDto) {
    const invoice = await this.invoiceRepository.create(dto);
    const developers: Developer[] = await this.developersService.getManyByIds(
      dto.developerIds,
    );

    invoice.$set('developers', developers);
    invoice.save();

    return invoice;
  }

  async getAll() {
    return await this.invoiceRepository.findAll({ include: { all: true } });
  }

  async getOneById(id: number) {
    return await this.invoiceRepository.findByPk(id, {
      include: { all: true },
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
