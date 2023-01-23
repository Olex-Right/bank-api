import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { IService } from 'src/globalInterfaces';
import { Developer } from './developer.model';
import { CreateDeveloperDto } from './dto/create-developer.dto';

interface IDevelopersService extends IService<CreateDeveloperDto, Developer> {
  getManyByIds: (ids: number[]) => Promise<Developer[]>;
}

@Injectable()
export class DevelopersService implements IDevelopersService {
  constructor(
    @InjectModel(Developer) private developersRepository: typeof Developer,
  ) {}

  async create(dto: CreateDeveloperDto) {
    return await this.developersRepository.create(dto);
  }

  async getAll() {
    return await this.developersRepository.findAll({ include: { all: true } });
  }

  async getOneById(id: number) {
    return await this.developersRepository.findByPk(id, {
      include: { all: true },
    });
  }

  async getManyByIds(ids: number[]) {
    return this.developersRepository.findAll({ where: { id: ids } });
  }

  async updateOneById(id: number, dto: CreateDeveloperDto) {
    const developer = await this.developersRepository.findByPk(id);
    developer.set({ ...dto });
    developer.save();

    return developer;
  }

  async deleteOneById(id: number) {
    await (await this.developersRepository.findByPk(id)).destroy();
  }
}
