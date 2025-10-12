import { Injectable } from '@nestjs/common';
import { IProject } from 'src/domain/interface/project.interface';
import { ProjectsRepositoryService } from 'src/infrastructure/database/repositories/projects.repository.service';
import { UsersRepositoryService } from 'src/infrastructure/database/repositories/users.repository.service';
import { BaseUseCase } from '../base-use-case';

@Injectable()
export class GetProjectByIdService implements BaseUseCase {
    constructor(
        private readonly projectsRepository: ProjectsRepositoryService,
        private readonly usersRepository: UsersRepositoryService,
    ) { }

    async execute(payload: { projectId: number, userId: number }): Promise<IProject> {
        const user = await this.usersRepository.findById(payload.userId);
        const project = await this.projectsRepository.findByUserIdAndId(user.id, payload.projectId);

        if (!project) {
            throw new Error('Project not found for this user');
        }

        return project;
    }
}
