import { ProjectProgressTypes } from '../enums/project-progress-types.enum';

export interface ProjectInterface {
  _id?: string;
  name: string;
  status: ProjectProgressTypes;
  progress: number;
  updatedAt?: Date;
}
