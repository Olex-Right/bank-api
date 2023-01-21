export class CreateInvoiceDto {
  readonly invoiceNumber: number;
  readonly value: number;
  readonly currency: string;
  readonly dateOfOpen?: Date;
  readonly invoiceType: 'employeeHours' | 'projectHours' | 'TaskHours';
  readonly developersInfo: DeveloperInfo[];
}

interface DeveloperInfo {
  developerId: number;
  developerSalary: number;
  currency: string;
  typeOfSalary: 'byHours' | 'byProject' | 'fixed';
}
