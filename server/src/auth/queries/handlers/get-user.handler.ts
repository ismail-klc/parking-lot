import { UnauthorizedException } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/auth/entities/user.entity';
import { Repository } from 'typeorm';
import { GetUserQuery } from '../impl/get-user.query';

@QueryHandler(GetUserQuery)
export class GetUserHandler implements IQueryHandler<GetUserQuery> {
    constructor(
        @InjectRepository(User)
        private authRepository: Repository<User>,
        private jwtService: JwtService
    ) { }

    async execute(query: GetUserQuery) {
        console.log('Async GetUserQuery...');

        try {
            const data = await this.jwtService.verifyAsync(query.token);
            const user = await this.authRepository.findOne({ id: data.id });
            return user;

        } catch (error) {
            throw new UnauthorizedException();
        }
    }
}