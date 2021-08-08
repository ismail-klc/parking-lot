import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthController } from './auth.controller';
import { User } from './entities/user.entity';
import { QueryHandlers } from './queries/handlers';
import { CommandHandlers } from './commands/handlers';
import { AuthService } from './auth.service';

@Module({
  imports: [
    CqrsModule,
    TypeOrmModule.forFeature([User])
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    ...CommandHandlers,
    ...QueryHandlers
]
})
export class AuthModule {}
