import { Injectable } from '@nestjs/common';
import { IProject } from 'src/domain/interface/project.interface';
import { IProjectsRepository } from 'src/domain/repositories/projects-repository.interface';
import { DataSource, DeepPartial, Repository } from 'typeorm';
import { ProjectEntity } from '../entities/project.entity';

@Injectable()
export class ProjectsRepositoryService extends Repository<ProjectEntity> implements IProjectsRepository{
    constructor(dataSource: DataSource) {
        super(ProjectEntity, dataSource.createEntityManager());
    }

    findAllByUserId(userId: number): Promise<IProject[]> {
        return this.findBy({user: {id: userId}});
    }

    findById(id: number): Promise<IProject | null> {
        return this.findOneBy({id});
    }

    add(payload: DeepPartial<IProject>): Promise<IProject> {
        return this.save(payload);
    }
}
