import { DeepPartial } from 'typeorm';

import { IProject } from '../interface/project.interface';

export interface IProjectsRepository {
  findAllByUserId(userId: number): Promise<IProject[]>;
  findByUserIdAndId(userId: number, id: number): Promise<IProject>;
  add(payload: DeepPartial<IProject>): Promise<IProject>;
}
