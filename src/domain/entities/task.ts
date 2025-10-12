import { Project } from './project';
import { User } from './user';
import { ITask } from '../interface/task.interface';

export class Task implements ITask {
  id: number;
  title: string;
  description: string;
  status: 'pending' | 'in-progress' | 'completed';
  project: Project;
  user: User;
  createdAt: Date;
  updatedAt: Date;
}
