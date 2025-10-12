import { Injectable } from '@nestjs/common';
import { ITask } from 'src/domain/interface/task.interface';
import { TasksRepositoryService } from 'src/infrastructure/database/repositories/tasks.repository.service';
import { UsersRepositoryService } from 'src/infrastructure/database/repositories/users.repository.service';
import { BaseUseCase } from '../base-use-case';

@Injectable()
export class GetTaskByIdService implements BaseUseCase {
    constructor(
        private readonly tasksRepository: TasksRepositoryService,
        private readonly usersRepository: UsersRepositoryService,
    ) { }

    async execute(payload: { taskId: number, userId: number }): Promise<ITask> {
        const user = await this.usersRepository.findById(payload.userId);
        const task = await this.tasksRepository.findByUserIdAndId(user.id, payload.taskId);

        if (!task || task.user.id !== user.id) {
            throw new Error('Task not found for this user');
        }

        return task;
    }
}
