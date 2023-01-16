import { CreateIncomeDto } from './dto/create-income.dto';
import { Income } from './models/icomes.model';
import { PlannedIncome } from './models/PlannedIncomes.model';

export interface IBaseIncome<T extends typeof Income> {
  create: (dto: CreateIncomeDto) => Promise<T['prototype']>;
  getAll: () => Promise<T['prototype'][]>;
  getOneById: (id: string) => Promise<T['prototype']>;
  updateOneById: (id: string, dto: CreateIncomeDto) => Promise<T['prototype']>;
  deleteOneById: (id: string) => void;
}

export interface IPlannedIncome extends IBaseIncome<typeof PlannedIncome> {
  getNumber3: () => Promise<PlannedIncome>;
  addIsPlanned: (plannedIncome: PlannedIncome) => Promise<PlannedIncome>;
}
