import { TaskProgressTypes } from '../enums/task-progress-types.enum';

export interface TaskInterface {
  _id?: string;
  name: string;
  status: TaskProgressTypes;
  progress: number;
  description: string;
  updatedAt?: Date;
}
