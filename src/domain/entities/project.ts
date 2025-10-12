import { IProject } from '../interface/project.interface';
import { ITask } from '../interface/task.interface';
import { IUser } from '../interface/user.interface';

export class Project implements IProject {
  id: number;
  name: string;
  description: string;
  user: IUser;
  tasks: ITask[];
  createdAt: Date;
  updatedAt: Date;
}
