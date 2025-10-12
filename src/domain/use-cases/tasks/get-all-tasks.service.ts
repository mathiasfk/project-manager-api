import { Injectable } from '@nestjs/common';
import { ITask } from 'src/domain/interface/task.interface';
import { TasksRepositoryService } from 'src/infrastructure/database/repositories/tasks.repository.service';
import { UsersRepositoryService } from 'src/infrastructure/database/repositories/users.repository.service';
import { BaseUseCase } from '../base-use-case';

@Injectable()
export class GetAllTasksService implements BaseUseCase {
    constructor(
        private readonly tasksRepository: TasksRepositoryService,
        private readonly usersRepository: UsersRepositoryService,
    ) { }

    async execute(payload: { userId: number }): Promise<ITask[]> {
        const user = await this.usersRepository.findById(payload.userId);
        const tasks = this.tasksRepository.findAllByUserId(user.id);

        if (!tasks) {
            throw new Error('No tasks found for this user');
        }

        return tasks;
    }
}