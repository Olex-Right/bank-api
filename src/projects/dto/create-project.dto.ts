import { DeveloperValue } from "../project.model";

export class CreateProjectDto {
  readonly name: string;
  readonly value: number;
  readonly developerValue?: DeveloperValue;
}
