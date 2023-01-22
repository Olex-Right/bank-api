import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateIncomeDto } from './dto/create-income.dto';
import { Income } from './models/icomes.model';

@Injectable()
export class IncomesService {
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

  async getOneById(id: string): Promise<Income> {
    const income = await this.incomeRepository.findByPk(id);

    return income;
  }

  async getMonthIncomes(monthIndex: number): Promise<Income[]> {
    const incomes = this.incomeRepository.findAll({ where: { monthIndex } });
    return incomes;
  }

  async updateOneById(id: string, dto: CreateIncomeDto): Promise<Income> {
    const income = await this.incomeRepository.findByPk(id);
    income.set({ ...dto });
    income.save();

    // const updatedIncome = await this.incomeRepository.update(
    //   { ...dto },
    //   { where: { id } },
    // );

    return income;
  }

  async deleteOneById(id: string) {
    await (await this.incomeRepository.findByPk(id)).destroy();
    console.log('destroyed ');
  }
}
