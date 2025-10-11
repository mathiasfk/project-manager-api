import { Injectable } from '@nestjs/common';
import { ITask } from 'src/domain/interface/task.interface';
import { ITasksRepository } from 'src/domain/repositories/tasks-repository.interface';
import { DataSource, DeepPartial, Repository } from 'typeorm';
import { TaskEntity } from '../entities/task.entity';

@Injectable()
export class TasksRepositoryService extends Repository<TaskEntity> implements ITasksRepository{
    constructor(dataSource: DataSource) {
        super(TaskEntity, dataSource.createEntityManager());
    }

    findAllByUserId(userId: number): Promise<ITask[]> {
        return this.findBy({user: {id: userId}});
    }

    findById(id: number): Promise<ITask | null> {
        return this.findOneBy({id});
    }

    add(payload: DeepPartial<ITask>): Promise<ITask> {
        return this.save(payload);
    }

    updateById(id: number, payload: DeepPartial<ITask>): Promise<ITask> {
        this.update(id, payload);
        return this.findOneBy({id}) as Promise<ITask>;
    }
}
