import { Injectable } from '@nestjs/common';
import { IProject } from 'src/domain/interface/project.interface';
import { ProjectsRepositoryService } from 'src/infrastructure/database/repositories/projects.repository.service';
import { UsersRepositoryService } from 'src/infrastructure/database/repositories/users.repository.service';

@Injectable()
export class GetAllProjectsService {
    constructor(
        private readonly projectsRepository: ProjectsRepositoryService,
        private readonly usersRepository: UsersRepositoryService,
    ) { }

    async execute(userId: number): Promise<IProject[]> {
        const user = await this.usersRepository.findById(userId);
        const projects = await this.projectsRepository.findAllByUserId(user.id);

        if (!projects) {
            throw new Error('No projects found for this user');
        }

        return projects;
    }
}
