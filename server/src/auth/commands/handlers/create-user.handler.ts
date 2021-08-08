import { BadRequestException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/auth/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserCommand } from '../impl/create-user.command';
import * as bcrypt from 'bcrypt';

@CommandHandler(CreateUserCommand)
export class CreateUserHandler implements ICommandHandler<CreateUserCommand> {
  constructor(
    @InjectRepository(User)
    private authRepository: Repository<User>,
  ) { }

  async execute(command: CreateUserCommand) {
    console.log('CreateUserCommand working, user created...');
    const user = await this.authRepository.findOne({email: command.dto.email});
    if (user) {
        throw new BadRequestException('This email is already used');
    }

    // hash password and save
    const hashedPassword = await bcrypt.hash(command.dto.password, 12);
    const newUser = await this.authRepository.save({
      email: command.dto.email,
      name: command.dto.fullName,
      password: hashedPassword,
      role: command.dto.role
    });

    delete newUser.password;

    return newUser;
  }
}