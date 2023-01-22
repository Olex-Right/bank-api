import { InvoiceSalType } from '../models/invoice.model';
import { CreateInvDevSalDto } from './create-invDevSal.dto';

export class CreateInvoiceDto {
  readonly invoiceNumber: number;
  readonly value: number;
  readonly currency: string;
  readonly dateOfOpen?: Date;
  readonly dateOfDue?: Date;
  readonly invoiceSalType: InvoiceSalType;
  readonly invoiceDevSalDto: CreateInvDevSalDto[];
}