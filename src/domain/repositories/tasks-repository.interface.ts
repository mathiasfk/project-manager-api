import { DeepPartial } from 'typeorm';

import { ITask } from '../interface/task.interface';

export interface ITasksRepository {
  findAllByUserId(userId: number): Promise<ITask[]>;
  findByUserIdAndId(userId: number, id: number): Promise<ITask | null>;
  add(payload: DeepPartial<ITask>): Promise<ITask>;
  updateById(id: number, payload: DeepPartial<ITask>): Promise<ITask>;
}
