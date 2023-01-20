import { Injectable } from '@nestjs/common';
import { Inject } from '@nestjs/common/decorators';
import { HttpStatus } from '@nestjs/common/enums';
import { HttpException } from '@nestjs/common/exceptions';
import { InjectModel } from '@nestjs/sequelize';
import { TypesService } from 'src/types/types.service';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { Expense } from './model/expense.model';

interface IExpensesService {
  create: (dto: CreateExpenseDto) => Promise<Expense>;
  getAll: () => Promise<Expense[]>;
  getOneById: (id: number) => Promise<Expense>;
  updateOneById: (id: string, dto: CreateExpenseDto) => Promise<Expense>;
  deleteOneById: (id: string) => void;
}

@Injectable()
export class ExpensesService implements IExpensesService {
  constructor(
    @InjectModel(Expense) private expensesRepository: typeof Expense,
    @Inject(TypesService) private readonly typesService: TypesService,
  ) {}

  async create(dto: CreateExpenseDto) {
    const type = await this.typesService.getOneByName(dto.typeName);
    if (!type)
      throw new HttpException(
        'No type with such name exists',
        HttpStatus.BAD_GATEWAY,
      );

    const expense = await this.expensesRepository.create(dto);
    type.$add('expences', expense);

    return expense;
  }

  async getAll() {
    return await this.expensesRepository.findAll({ include: { all: true } });
  }

  async getOneById(id: number) {
    return await this.expensesRepository.findByPk(id, {
      include: { all: true },
    });
  }

  async updateOneById(id: string, dto: CreateExpenseDto) {
    const expense = await this.expensesRepository.findByPk(id);
    expense.set({ ...dto });
    expense.save();

    return expense;
  }

  async deleteOneById(id: string) {
    await (await this.expensesRepository.findByPk(id)).destroy();
  }
}
