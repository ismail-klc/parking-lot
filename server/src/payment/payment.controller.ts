import { Body, Controller, Get, HttpCode, Param, ParseIntPipe, Post, UseGuards } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { CreatePaymentCommand } from './commands/impl/create-payment.command';
import { CreatePaymentDto } from './dtos/create-payment.dto';

@Controller('payment')
@UseGuards(AuthGuard)
export class PaymentController {
    constructor(
        private readonly commandBus: CommandBus,
        private readonly queryBus: QueryBus,
    ) { }

    @Post()
    @HttpCode(201)
    createTicket(@Body() dto: CreatePaymentDto) {
        return this.commandBus.execute(new CreatePaymentCommand(dto));
    }
}
