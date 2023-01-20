export class CreateInvoiceDto{
  readonly invoiceNumber: number;
  readonly value: number;
  readonly currency: string;
  readonly dateOfOpen?: Date;
  readonly invoiceType: 'employeeHours' | 'projectHours' | 'TaskHours';;

}