import { Injectable } from '@nestjs/common';
import { ITask } from 'src/domain/interface/task.interface';
import { CreateTaskDto } from 'src/gateways/controllers/tasks/dtos/create-task.dto';
import { ProjectsRepositoryService } from 'src/infrastructure/database/repositories/projects.repository.service';
import { TasksRepositoryService } from 'src/infrastructure/database/repositories/tasks.repository.service';
import { UsersRepositoryService } from 'src/infrastructure/database/repositories/users.repository.service';
import { BaseUseCase } from '../base-use-case';

@Injectable()
export class CreateTaskService implements BaseUseCase {
    constructor(
        private readonly tasksRepository: TasksRepositoryService,
        private readonly projectsRepository: ProjectsRepositoryService,
        private readonly usersRepository: UsersRepositoryService,
    ) { }

    async execute(payload: { task: CreateTaskDto, userId: number }): Promise<ITask> {
        const user = await this.usersRepository.findById(payload.userId);
        const project = await this.projectsRepository.findByUserIdAndId(user.id, payload.task.projectId);

        const newTask = this.tasksRepository.add({
            title: payload.task.title,
            description: payload.task.description,
            project: { id: project.id },
            user: { id: user.id },
        });

        if (!newTask) {
            throw new Error('Error creating task');
        }

        return newTask;
    }
}
