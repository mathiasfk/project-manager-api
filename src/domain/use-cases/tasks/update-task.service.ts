import { Injectable } from '@nestjs/common';
import { ITask } from 'src/domain/interface/task.interface';
import { UpdateTaskDto } from 'src/gateways/controllers/tasks/dtos/update-task.dto';
import { TasksRepositoryService } from 'src/infrastructure/database/repositories/tasks.repository.service';
import { UsersRepositoryService } from 'src/infrastructure/database/repositories/users.repository.service';
import { BaseUseCase } from '../base-use-case';

@Injectable()
export class UpdateTaskService implements BaseUseCase {
    constructor(
        private readonly tasksRepository: TasksRepositoryService,
        private readonly usersRepository: UsersRepositoryService,
    ) { }

    async execute(payload: { task: UpdateTaskDto, userId: number, taskId: number }): Promise<ITask> {
        const user = await this.usersRepository.findById(payload.userId);
        const task = await this.tasksRepository.updateById(payload.taskId, payload.task);

        return task;
    }
}
