import { CreateUserDto } from "src/auth/dtos/create-user.dto";

export class CreateUserCommand {
    constructor(
      public readonly dto: CreateUserDto,
    ) {}
  }