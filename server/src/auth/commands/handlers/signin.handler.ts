import { BadRequestException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/auth/entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { SignInCommand } from '../impl/signin.command';
import { JwtService } from '@nestjs/jwt';

@CommandHandler(SignInCommand)
export class SignInHandler implements ICommandHandler<SignInCommand> {
    constructor(
        @InjectRepository(User)
        private authRepository: Repository<User>,
        private jwtService: JwtService,
    ) { }

    async execute(command: SignInCommand) {
        console.log('SignInCommand working, signing in...');
        const user = await this.authRepository.findOne({ email: command.dto.email });
        if (!user) {
            throw new BadRequestException(['Wrong password or email']);
        }

        // compare passwords
        if (!await bcrypt.compare(command.dto.password, user.password)) {
            throw new BadRequestException(['Wrong password or email']);
        }

        // return signed jwt token
        return await this.jwtService.signAsync(
            {
                id: user.id,
                email: user.email,
                role: user.role
            }
        );
    }
}