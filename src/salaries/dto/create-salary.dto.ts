import { TypeOfSalary } from "../model/salary.model";

export class CreateSalaryDto {
  typeOfSalary: TypeOfSalary;

  fixedValue?: number;

  fixedDate?: Date;

  perHourValue?: number;

  hours?: number;

  HoursDate?: Date;

  perProjectValue?: number;

  projectStart?: Date;

  projectEnd?: Date;
}
