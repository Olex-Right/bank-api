import { TypeOfSalary } from "../model/salary.model";

export class CreateSalaryDto {
  readonly typeOfSalary: TypeOfSalary;

  readonly fixedValue?: number;

  readonly fixedDate?: Date;

  readonly perHourValue?: number;

  readonly hours?: number;

  readonly HoursDate?: Date;

  readonly perProjectValue?: number;

  readonly projectStart?: Date;

  readonly projectEnd?: Date;
}
