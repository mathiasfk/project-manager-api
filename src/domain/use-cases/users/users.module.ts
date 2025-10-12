import { Module } from '@nestjs/common';

import { DatabaseModule } from 'src/infrastructure/database/database.module';
import { CreateUserService } from './create-user.service';
import { GetUserByIdService } from './get-user-by-id.service';

@Module({
  imports: [DatabaseModule],
  providers: [CreateUserService, GetUserByIdService],
})
export class UsersModule { }
