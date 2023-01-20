import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateTypeDto } from './dto/create-type.dto';
import { Type } from './model/type.model';

interface ITypesService {
  create: (dto: CreateTypeDto) => Promise<Type>;
  getAll: () => Promise<Type[]>;
  getOneById: (id: number) => Promise<Type>;
  getOneByName: (typeName: string) => Promise<Type>;
  updateOneById: (id: number, dto: CreateTypeDto) => Promise<Type>;
  deleteOneById: (id: number) => void;
}

@Injectable()
export class TypesService implements ITypesService {
  constructor(@InjectModel(Type) private typeRepository: typeof Type) {}
  async create(dto: CreateTypeDto) {
    return await this.typeRepository.create(dto);
  }

  async getAll() {
    return await this.typeRepository.findAll({ include: { all: true } });
  }

  async getOneById(id: number) {
    return await this.typeRepository.findByPk(id, {
      include: { all: true },
    });
  }

  async getOneByName(typeName: string) {
    return await this.typeRepository.findOne({
      where: { name: typeName },
      include: { all: true },
    });
  }

  async updateOneById(id: number, dto: CreateTypeDto) {
    const type = await this.typeRepository.findByPk(id);
    type.set({ ...dto });
    type.save();

    return type;
  }

  async deleteOneById(id: number) {
    await (await this.typeRepository.findByPk(id)).destroy();
  }
}
