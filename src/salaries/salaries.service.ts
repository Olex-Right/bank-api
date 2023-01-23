import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { IService } from 'src/globalInterfaces';
import { CreateSalaryDto } from './dto/create-salary.dto';
import { Salary } from './model/salary.model';

interface ISalariesService extends IService<CreateSalaryDto, Salary> {}

@Injectable()
export class SalariesService implements ISalariesService {
  constructor(@InjectModel(Salary) private salaryRepository: typeof Salary) {}
  async create(dto: CreateSalaryDto) {
    return await this.salaryRepository.create(dto);
  }

  async getAll() {
    return await this.salaryRepository.findAll({ include: { all: true } });
  }

  async getOneById(id: number) {
    return await this.salaryRepository.findByPk(id, {
      include: { all: true },
    });
  }

  async updateOneById(id: number, dto: CreateSalaryDto) {
    const salary = await this.salaryRepository.findByPk(id);
    salary.set({ ...dto });
    salary.save();

    return salary;
  }

  async deleteOneById(id: number) {
    await (await this.salaryRepository.findByPk(id)).destroy();
  }
}
