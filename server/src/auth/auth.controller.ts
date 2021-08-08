import { Body, ClassSerializerInterceptor, Controller, Get, HttpCode, Post, Req, Res, UseGuards, UseInterceptors } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateUserCommand } from './commands/impl/create-user.command';
import { SignInCommand } from './commands/impl/signin.command';
import { CreateUserDto } from './dtos/create-user.dto';
import { SignInDto } from './dtos/signin.dto';
import { Response, Request } from 'express';
import { GetUserQuery } from './queries/impl/get-user.query';
import { AdminGuard } from './guards/admin.guard';
import { AuthGuard } from './guards/auth.guard';
import { GetUsersQuery } from './queries/impl/get-users.query';

@Controller('auth')
@UseInterceptors(ClassSerializerInterceptor)
export class AuthController {
    constructor(
        private readonly commandBus: CommandBus,
        private readonly queryBus: QueryBus,
    ) { }

    @Post('create')
    @HttpCode(201)
    @UseGuards(AdminGuard)
    async signUp(@Body() dto: CreateUserDto) {
        return this.commandBus.execute(new CreateUserCommand(dto));
    }

    @Post('signin')
    @HttpCode(200)
    async signIn(@Body() dto: SignInDto, @Res({ passthrough: true }) res: Response) {
        const token = await this.commandBus.execute(new SignInCommand(dto));
        res.cookie('token', token, { httpOnly: true });

        return {
            msg: 'success'
        }
    }

    @Post('signout')
    @UseGuards(AuthGuard)  
    @HttpCode(200)
    signOut(@Res({ passthrough: true }) res: Response) {
        res.clearCookie('token');

        return {
            msg: 'success'
        }
    }

    @UseGuards(AuthGuard)
    @Get('me')
    @HttpCode(200)
    currentUser(@Req() req: Request) {
        const token = req.cookies.token;

        return this.queryBus.execute(new GetUserQuery(token));
    }

    @UseGuards(AuthGuard)
    @Get('users')
    @HttpCode(200)
    getUsers(@Req() req: Request) {
        return this.queryBus.execute(new GetUsersQuery());
    }
}