import { Body, Controller, Get, NotFoundException, Param, Post, Req } from '@nestjs/common';
import { ITask } from 'src/domain/interface/task.interface';
import { CreateTaskService } from 'src/domain/use-cases/tasks/create-task.service';
import { GetAllTasksService } from 'src/domain/use-cases/tasks/get-all-tasks.service';
import { GetTaskByIdService } from 'src/domain/use-cases/tasks/get-task-by-id.service';
import { CreateTaskDto } from './dtos/create-task.dto';

@Controller('tasks')
export class TasksController {
    constructor(
        private readonly createTaskUseCase: CreateTaskService,
        private readonly getAllTasksUseCase: GetAllTasksService,
        private readonly getTaskByIdUseCase: GetTaskByIdService,
    ) { }

    @Get()
    findAll(@Req() request: any): Promise<ITask[]> {
        try {
            const loggerUserId = request['user'].sub;
            return this.getAllTasksUseCase.execute({
                userId: loggerUserId,
            })
        } catch (error) {
            throw new NotFoundException(error.message);
        }
    }

    @Get(':id')
    findById(@Req() request: any, @Param('id') taskId: number): Promise<ITask> {
        try {
            const loggerUserId = request['user'].sub;
            return this.getTaskByIdUseCase.execute({
                userId: loggerUserId,
                taskId: taskId,
            })
        } catch (error) {
            throw new NotFoundException(error.message);
        }
    }

    @Post()
    create(@Req() request: any, @Body() dto: CreateTaskDto): Promise<ITask> {
        try {
            const loggerUserId = request['user'].sub;
            return this.createTaskUseCase.execute({
                task: dto,
                userId: loggerUserId,
            })
        } catch (error) {
            throw new NotFoundException(error.message);
        }
    }
}
