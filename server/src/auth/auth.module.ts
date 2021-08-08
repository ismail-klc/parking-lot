import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthController } from './auth.controller';
import { CommandHandlers } from './commands/handlers';
import { User } from './entities/user.entity';

@Module({
  imports: [
    CqrsModule,
    TypeOrmModule.forFeature([User])
  ],
  controllers: [AuthController],
  providers: [
    ...CommandHandlers,
]
})
export class AuthModule {}
