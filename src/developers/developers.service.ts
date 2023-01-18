import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Developer } from './developer.model';
import { CreateDeveloperDto } from './dto/create-developer.dto';

interface IDevelopersService {
  create: (dto: CreateDeveloperDto) => Promise<Developer>;
  getAll: () => Promise<Developer[]>;
  getOneById: (id: number) => Promise<Developer>;
  updateOneById: (id: number, dto: CreateDeveloperDto) => Promise<Developer>;
  deleteOneById: (id: number) => void;
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
