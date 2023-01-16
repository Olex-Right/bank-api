import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateIncomeDto } from '../dto/create-income.dto';
import { PlannedIncome } from '../models/PlannedIncomes.model';
import { IPlannedIncome } from '../types';

@Injectable()
export class PlannedIncomesService implements IPlannedIncome {
  constructor(
    @InjectModel(PlannedIncome)
    private plannedIncomeRepository: typeof PlannedIncome,
  ) {}

  async getNumber3() {
    const get3income = await this.plannedIncomeRepository.findByPk(2);
    return get3income;
  }

  async addIsPlanned(plannedIncome: PlannedIncome) {
    plannedIncome.isPlanned = true;
    plannedIncome.save();

    return plannedIncome;
  }

  async create(dto: CreateIncomeDto) {
    const createdIncome = await this.plannedIncomeRepository.create({
      ...dto,
    });
    createdIncome.isPlanned = true;
    createdIncome.save();

    return createdIncome;
  }

  async getAll(): Promise<PlannedIncome[]> {
    const incomes = await this.plannedIncomeRepository.findAll();

    return incomes;
  }

  async getOneById(id: string): Promise<PlannedIncome> {
    const income = await this.plannedIncomeRepository.findByPk(id);

    return income;
  }

  async updateOneById(
    id: string,
    dto: CreateIncomeDto,
  ): Promise<PlannedIncome> {
    const income = await this.plannedIncomeRepository.findByPk(id);
    income.set({ ...dto });
    income.save();

    return income;
  }

  async deleteOneById(id: string) {
    await (await this.plannedIncomeRepository.findByPk(id)).destroy();
    console.log('destroyed ');
  }
}
