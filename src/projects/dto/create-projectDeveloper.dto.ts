export class CreateProjectDeveloperDto {
  readonly projectId: number;
  readonly developerId: number;
  readonly developerPrice: number;
  readonly priceCurrency: string;
}
