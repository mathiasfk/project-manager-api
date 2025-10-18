import { Injectable } from '@nestjs/common';
import { UsersRepositoryService } from 'src/infrastructure/database/repositories/users.repository.service';

@Injectable()
export class GetUserByEmailService {
    constructor(private readonly usersRepository: UsersRepositoryService) { }

    async execute(email: string) {
        return this.usersRepository.findByEmail(email);
    }
}
