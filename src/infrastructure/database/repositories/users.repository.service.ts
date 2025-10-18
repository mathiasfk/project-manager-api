import { Injectable } from '@nestjs/common';
import { IUser } from 'src/domain/interface/user.interface';
import { IUsersRepository } from 'src/domain/repositories/users-repository.interface';
import { DataSource, DeepPartial, Repository } from 'typeorm';

import { UserEntity } from '../entities/user.entity';

@Injectable()
export class UsersRepositoryService
  extends Repository<UserEntity>
  implements IUsersRepository {
  constructor(dataSource: DataSource) {
    super(UserEntity, dataSource.createEntityManager());
  }
  findByEmail(email: string): Promise<IUser> {
    return this.findOneByOrFail({ email });
  }

  findById(id: number): Promise<IUser> {
    return this.findOneByOrFail({ id });
  }

  add(user: DeepPartial<IUser>): Promise<IUser> {
    return this.save(user);
  }
}
