import { Developer } from 'src/developers/developer.model';

export class CreateProjectDeveloperDto {
  readonly developerPrice: number;
  readonly priceCurrency: string;
  readonly developer: Developer;
}
