import { Module } from '@nestjs/common';

import { UseCasesModule } from 'src/domain/use-cases/use-cases.module';
import { AuthModule } from 'src/infrastructure/auth/auth.module';
import { AuthController } from './auth/auth.controller';
import { ProjectsController } from './projects/projects.controller';
import { TasksController } from './tasks/tasks.controller';
import { UsersController } from './users/users.controller';

@Module({
  imports: [UseCasesModule, AuthModule],
  controllers: [ProjectsController, UsersController, TasksController, AuthController],
})
export class ControllersModule { }
