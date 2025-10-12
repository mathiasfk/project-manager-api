import { Project } from './project';
import { Task } from './task';
import { IUser } from '../interface/user.interface';

export class User implements IUser {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  projects: Project[];
  tasks: Task[];
  createdAt: Date;
  updatedAt: Date;
}
