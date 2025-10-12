import { Body, Controller, Get, NotFoundException, Param, Post, Req } from '@nestjs/common';
import { IProject } from 'src/domain/interface/project.interface';
import { CreateProjectService } from 'src/domain/use-cases/projects/create-project.service';
import { GetAllProjectsService } from 'src/domain/use-cases/projects/get-all-projects.service';
import { GetProjectByIdService } from 'src/domain/use-cases/projects/get-project-by-id.service';
import { CreateProjectDto } from './dtos/create-project.dto';

const loggerUser = 1;

@Controller('projects')
export class ProjectsController {
    constructor(
        private readonly createProjectUseCase: CreateProjectService,
        private readonly getAllProjectsUseCase: GetAllProjectsService,
        private readonly getProjectByIdUseCase: GetProjectByIdService,
    ) { }

    @Get()
    findAll(): Promise<IProject[]> {
        try {
            return this.getAllProjectsUseCase.execute(1);
        } catch (error) {
            throw new NotFoundException(error.message);
        }
    }

    @Get(':id')
    findById(@Req() request: any, @Param('id') id: number): Promise<IProject> {
        try {
            return this.getProjectByIdUseCase.execute({
                userId: loggerUser,
                projectId: id
            });
        } catch (error) {
            throw new NotFoundException(error.message);
        }
    }

    @Post()
    create(@Req() request: any, @Body() dto: CreateProjectDto): Promise<IProject> {
        try {
            return this.createProjectUseCase.execute({
                project: dto,
                userId: loggerUser,
            })
        } catch (error) {
            throw new NotFoundException(error.message);
        }
    }
}
