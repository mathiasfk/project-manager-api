import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { Public } from 'src/gateways/guards/auth-guard/auth-guard.service';
import { AuthService } from 'src/infrastructure/auth/auth.service';
import { LoginDto } from './dtos/login.dto';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @HttpCode(HttpStatus.OK)
    @Post('login')
    @Public()
    login(@Body() dto: LoginDto) {
        return this.authService.login(dto.email, dto.password);
    }
}
