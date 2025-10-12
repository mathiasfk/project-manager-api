import { Injectable } from '@nestjs/common';
import { IUser } from 'src/domain/interface/user.interface';
import { UsersRepositoryService } from 'src/infrastructure/database/repositories/users.repository.service';
import { BaseUseCase } from '../base-use-case';

@Injectable()
export class GetUserByIdService implements BaseUseCase {
    constructor(private readonly usersRepository: UsersRepositoryService) { }

    async execute(userId: number): Promise<IUser> {
        return this.usersRepository.findById(userId);
    }
}
