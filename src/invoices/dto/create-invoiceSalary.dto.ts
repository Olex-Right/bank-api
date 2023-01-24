import { CreateSalaryDto } from 'src/salaries/dto/create-salary.dto';

export class CreateInvoiceSalaryDto extends CreateSalaryDto {
  readonly developerId: number;
}
