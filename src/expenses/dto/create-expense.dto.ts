export class CreateExpenseDto {
  readonly value: number;
  readonly currency?: string;
  readonly typeName: string;
}
