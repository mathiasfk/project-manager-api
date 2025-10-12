import { IProject } from './project.interface';
import { IUser } from './user.interface';

export interface ITask {
  id: number;
  title: string;
  description: string;
  status: 'pending' | 'in-progress' | 'completed';
  project: IProject;
  user: IUser;
  createdAt: Date;
  updatedAt: Date;
}
