import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Developer } from './developer.model';
import { CreateDeveloperDto } from './dto/create-developer.dto';

interface IDevelopersService {
  create: (dto: CreateDeveloperDto) => Promise<Developer>;
  getAll: () => Promise<Developer[]>;
  getOneById: (id: string) => Promise<Developer>;
  updateOneById: (id: string, dto: CreateDeveloperDto) => Promise<Developer>;
  deleteOneById: (id: string) => void;
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

  async getOneById(id: string) {
    return await this.developersRepository.findByPk(id, {
      include: { all: true },
    });
  }

  async updateOneById(id: string, dto: CreateDeveloperDto) {
    const developer = await this.developersRepository.findByPk(id);
    developer.set({ ...dto });
    developer.save();

    return developer;
  }

  async deleteOneById(id: string) {
    await (await this.developersRepository.findByPk(id)).destroy();
  }
}
