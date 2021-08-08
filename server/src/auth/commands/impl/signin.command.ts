import { SignInDto } from "src/auth/dtos/signin.dto";

export class SignInCommand {
    constructor(
      public readonly dto: SignInDto,
    ) {}
  }