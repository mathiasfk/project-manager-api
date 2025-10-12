import { DeepPartial } from 'typeorm';

import { IUser } from '../interface/user.interface';

export interface IUsersRepository {
  findById(id: number): Promise<IUser | null>;
  add(user: DeepPartial<IUser>): Promise<IUser>;
}
