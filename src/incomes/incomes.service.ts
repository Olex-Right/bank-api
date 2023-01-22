import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { IService } from 'src/globalInterfaces';
import { CreateIncomeDto } from './dto/create-income.dto';
import { Income } from './models/icomes.model';

export interface IAllMonthSumIncomes {
  incomesSum: number;
  monthIndex: number;
}

interface IIncomesService extends IService<CreateIncomeDto, Income> {
  getSumIncomes: (incomes: Income[]) => number;
  getMonthSumIncomes: (monthIndex: number) => Promise<number>;
  getAllMonthSumIncome: () => Promise<IAllMonthSumIncomes[]>;
}

@Injectable()
export class IncomesService implements IIncomesService {
  constructor(@InjectModel(Income) private incomeRepository: typeof Income) {}

  async create(dto: CreateIncomeDto): Promise<Income> {
    let createdIncome = await this.incomeRepository.create(dto);

    if (dto.dateOfIncome) {
      createdIncome = await this.updateMonthIndex(
        createdIncome,
        dto.dateOfIncome,
      );
    }

    return createdIncome;
  }

  private async updateMonthIndex(income: Income, date: Date) {
    income.set('monthIndex', new Date(date).getMonth());
    income.save();

    return income;
  }

  async getAll(): Promise<Income[]> {
    const incomes = await this.incomeRepository.findAll();

    return incomes;
  }

  async getOneById(id: number): Promise<Income> {
    const income = await this.incomeRepository.findByPk(id);

    return income;
  }

  async getMonthIncomes(monthIndex: number): Promise<Income[]> {
    const incomes = this.incomeRepository.findAll({ where: { monthIndex } });
    return incomes;
  }

  getSumIncomes(incomes: Income[]): number {
    return incomes.reduce((sum, income) => sum + income.value, 0);
  }

  async getMonthSumIncomes(monthIndex: number): Promise<number> {
    const incomes = await this.getMonthIncomes(monthIndex);
    return this.getSumIncomes(incomes);
  }

  async getAllMonthSumIncome(): Promise<IAllMonthSumIncomes[]> {
    const allMonthSumIncomes: IAllMonthSumIncomes[] = [];
    for (let monthIndex = 0; monthIndex < 12; monthIndex++) {
      allMonthSumIncomes.push({
        incomesSum: await this.getMonthSumIncomes(monthIndex),
        monthIndex,
      });
    }
    return allMonthSumIncomes;
  }

  async updateOneById(id: number, dto: CreateIncomeDto): Promise<Income> {
    const income = await this.incomeRepository.findByPk(id);
    income.set({ ...dto });
    income.save();

    // const updatedIncome = await this.incomeRepository.update(
    //   { ...dto },
    //   { where: { id } },
    // );

    return income;
  }

  async deleteOneById(id: number) {
    await (await this.incomeRepository.findByPk(id)).destroy();
    console.log('destroyed ');
  }
}
