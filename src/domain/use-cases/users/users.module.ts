import { Module } from '@nestjs/common';

import { DatabaseModule } from 'src/infrastructure/database/database.module';
import { CreateUserService } from './create-user.service';
import { GetUserByEmailService } from './get-user-by-email.service';
import { GetUserByIdService } from './get-user-by-id.service';

@Module({
  imports: [DatabaseModule],
  providers: [CreateUserService, GetUserByIdService, GetUserByEmailService],
  exports: [CreateUserService, GetUserByIdService, GetUserByEmailService],
})
export class UsersModule { }
