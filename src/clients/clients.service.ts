import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { IService } from 'src/globalInterfaces';
import { CreateClientDto } from './dto/create-client.dto';
import { Client } from './model/client.model';

interface IClientsService extends IService<CreateClientDto, Client> {}

@Injectable()
export class ClientsService implements IClientsService {
  constructor(@InjectModel(Client) private clientRepository: typeof Client) {}

  async create(dto: CreateClientDto) {
    return await this.clientRepository.create(dto);
  }

  async getAll() {
    return await this.clientRepository.findAll();
  }

  async getOneById(id: number) {
    return await this.clientRepository.findByPk(id, {
      include: { all: true },
    });
  }

  async updateOneById(id: number, dto: CreateClientDto) {
    const type = await this.clientRepository.findByPk(id);
    type.set({ ...dto });
    type.save();

    return type;
  }

  async deleteOneById(id: number) {
    await (await this.clientRepository.findByPk(id)).destroy();
  }
}
