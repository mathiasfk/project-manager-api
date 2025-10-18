import { Body, Controller, Get, NotFoundException, Param, Post, Req } from '@nestjs/common';
import { IUser } from 'src/domain/interface/user.interface';
import { CreateUserService } from 'src/domain/use-cases/users/create-user.service';
import { GetUserByIdService } from 'src/domain/use-cases/users/get-user-by-id.service';
import { Public } from 'src/gateways/guards/auth-guard/auth-guard.service';
import { CreateUserDto } from './dtos/create-user.dto';

@Controller('users')
export class UsersController {
    constructor(
        private readonly createUserUseCase: CreateUserService,
        private readonly getUserByIdUseCase: GetUserByIdService,
    ) { }

    @Get(':id')
    findById(@Param('id') id: number): Promise<IUser> {
        try {
            return this.getUserByIdUseCase.execute(id);
        } catch (error) {
            throw new NotFoundException(error.message);
        }
    }

    @Post()
    @Public()
    create(@Req() request: any, @Body() dto: CreateUserDto): Promise<IUser> {
        try {
            return this.createUserUseCase.execute(dto);
        } catch (error) {
            throw new NotFoundException(error.message);
        }
    }
}
