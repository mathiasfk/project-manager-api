import { Module } from '@nestjs/common';

import { DatabaseModule } from 'src/infrastructure/database/database.module';
import { CreateProjectService } from './create-project.service';
import { GetAllProjectsService } from './get-all-projects.service';
import { GetProjectByIdService } from './get-project-by-id.service';

@Module({
  imports: [DatabaseModule],
  providers: [
    GetAllProjectsService,
    GetProjectByIdService,
    CreateProjectService,
  ],
})
export class ProjectsModule { }
