import { Body, Controller, Get, NotFoundException, Post, Req } from '@nestjs/common';
import { ITask } from 'src/domain/interface/task.interface';
import { CreateTaskService } from 'src/domain/use-cases/tasks/create-task.service';
import { GetAllTasksService } from 'src/domain/use-cases/tasks/get-all-tasks.service';
import { GetTaskByIdService } from 'src/domain/use-cases/tasks/get-task-by-id.service';
import { CreateTaskDto } from './dtos/create-task.dto';

const loggerUser = 1;

@Controller('tasks')
export class TasksController {
    constructor(
        private readonly createTaskUseCase: CreateTaskService,
        private readonly getAllTasksUseCase: GetAllTasksService,
        private readonly getTaskByIdUseCase: GetTaskByIdService,
    ) { }

    @Get()
    findAll(): Promise<ITask[]> {
        try {
            return this.getAllTasksUseCase.execute({
                userId: loggerUser,
            })
        } catch (error) {
            throw new NotFoundException(error.message);
        }
    }

    @Get(':id')
    findById(): Promise<ITask> {
        try {
            return this.getTaskByIdUseCase.execute({
                userId: loggerUser,
                taskId: 1,
            })
        } catch (error) {
            throw new NotFoundException(error.message);
        }
    }

    @Post()
    create(@Req() request: any, @Body() dto: CreateTaskDto): Promise<ITask> {
        try {
            return this.createTaskUseCase.execute({
                task: dto,
                userId: loggerUser,
            })
        } catch (error) {
            throw new NotFoundException(error.message);
        }
    }
}
