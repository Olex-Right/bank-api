export class CreateInvDevSalaryDto {
  readonly invoiceDevId: number;
  readonly salaryValue: number;
  readonly currency: string;
  readonly typeOfSalary: 'byHours' | 'byProject' | 'fixed';
}
