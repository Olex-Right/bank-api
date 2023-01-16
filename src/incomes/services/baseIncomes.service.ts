import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateIncomeDto } from '../dto/create-income.dto';
import { Income } from '../models/icomes.model';
import { IBaseIncome } from '../types';

@Injectable()
export class BaseIncomesService implements IBaseIncome<typeof Income>{
  constructor(@InjectModel(Income) private incomeRepository: typeof Income) {}

  async create(dto: CreateIncomeDto) {
    const createdIncome = await this.incomeRepository.create(dto)

    return createdIncome;
  };

  async getAll(): Promise<Income[]> {
    const incomes = await this.incomeRepository.findAll();

    return incomes;
  }

  async getOneById(id: string): Promise<Income> {
    const income = await this.incomeRepository.findByPk(id);

    return income;
  }

  async updateOneById(id: string, dto: CreateIncomeDto): Promise<Income> {
    const income = await this.incomeRepository.findByPk(id);
    income.set({ ...dto });
    income.save();

    return income;
  }

  async deleteOneById(id: string) {
    await (await this.incomeRepository.findByPk(id)).destroy();
    console.log('destroyed ');
  }
}
