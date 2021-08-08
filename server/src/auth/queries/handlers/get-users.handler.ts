import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GetUsersQuery } from '../impl/get-users.query';
import { User } from 'src/auth/entities/user.entity';

@QueryHandler(GetUsersQuery)
export class GetUsersHandler implements IQueryHandler<GetUsersQuery> {
    constructor(
        @InjectRepository(User)
        private authRepository: Repository<User>,
    ) { }

    async execute(query: GetUsersQuery) {
        console.log('Async GetUsersQuery...');

        const users = await this.authRepository.find();
        return users;
    }
}