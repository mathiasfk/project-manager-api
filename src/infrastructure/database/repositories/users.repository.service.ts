import { Injectable } from '@nestjs/common';
import { IUser } from 'src/domain/interface/user.interface';
import { IUsersRepository } from 'src/domain/repositories/users-repository.interface';
import { DataSource, DeepPartial, Repository } from 'typeorm';
import { UserEntity } from '../entities/user.entity';

@Injectable()
export class UsersRepositoryService extends Repository<UserEntity> implements IUsersRepository {
    constructor(dataSource: DataSource) {
        super(UserEntity, dataSource.createEntityManager());
    }

    findById(id: number): Promise<IUser | null> {
        return this.findOneBy({id});
    }
    
    add(user: DeepPartial<IUser>): Promise<IUser> {
        return this.save(user);
    }
}
