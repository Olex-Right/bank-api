import { TypeOfSalary } from 'src/salaries/model/salary.model';
import { CreateInvoiceSalaryDto } from './create-invoiceSalary.dto';

export class CreateInvoiceDto {
  readonly invoiceNumber: number;
  readonly value: number;
  readonly currency: string;
  readonly dateOfOpen?: Date;
  readonly dateOfDue?: Date;
  readonly invoiceSalaryType: TypeOfSalary;
  readonly invoiceSalaryDtos: CreateInvoiceSalaryDto[];
  readonly clientId: number;
}
