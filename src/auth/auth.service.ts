import {
    Injectable, NotFoundException, UnauthorizedException
} from '@nestjs/common';
import { UserService } from '../users/user.service';
import bcrypt = require('bcryptjs');
import { JwtService } from '@nestjs/jwt';

@ Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService,
    ){}

    async validateUser(email: string, pass: string): Promise< any> {
        const user = await this .userService.findOne('email', email);
        if(!user)throw new NotFoundException()
        const result = await bcrypt.compare(pass, user.password);
        if(!result) throw new UnauthorizedException();
        const {password, ...res} = user;
        const token = this .generateJwt(res);
        return token;
    }

    generateJwt(user: any){
        const payload = { email: user.email, sub: user.id };
        return {
            access_token: this .jwtService.sign(payload),
            id: user.id
        };
    }
}
