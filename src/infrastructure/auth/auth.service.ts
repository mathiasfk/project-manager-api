import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcrypt';
import { GetUserByEmailService } from 'src/domain/use-cases/users/get-user-by-email.service';

@Injectable()
export class AuthService {
    constructor(
        private readonly getUserByEmailService: GetUserByEmailService,
        private readonly jwtService: JwtService,
    ) { }

    async login(email: string, password: string) {
        const user = await this.getUserByEmailService.execute(email);
        const isAValidUser = await compare(password, user.password);

        if (!isAValidUser) {
            throw new Error('Invalid credentials');
        }

        const payload = { username: user.email, sub: user.id };
        return {
            access_token: await this.jwtService.signAsync(payload),
        };
    }
}
