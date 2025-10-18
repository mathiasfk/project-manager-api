import { Injectable } from '@nestjs/common';
import { hash } from 'bcrypt';
import { IUser } from 'src/domain/interface/user.interface';
import { CreateUserDto } from 'src/gateways/controllers/users/dtos/create-user.dto';
import { UsersRepositoryService } from 'src/infrastructure/database/repositories/users.repository.service';
import { BaseUseCase } from '../base-use-case';

@Injectable()
export class CreateUserService implements BaseUseCase {
    private readonly saltRounds = 10;

    constructor(private readonly usersRepository: UsersRepositoryService) { }

    async execute(user: CreateUserDto): Promise<IUser> {
        const hashedPassword = await hash(user.password, this.saltRounds);
        const newUser = await this.usersRepository.add({ ...user, password: hashedPassword });
        if (!newUser) {
            throw new Error('Error creating user');
        }
        return newUser;
    }
}
