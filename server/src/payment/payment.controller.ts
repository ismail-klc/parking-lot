import { Body, Controller, Get, HttpCode, Param, ParseIntPipe, Post, UseGuards } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { CompletePaymentCommand } from './commands/impl/complete-payment.command';
import { CreatePaymentCommand } from './commands/impl/create-payment.command';
import { CreatePaymentDto } from './dtos/create-payment.dto';
import { GetPaymentsQuery } from './queries/impl/get-payments.query';

@Controller('payment')
@UseGuards(AuthGuard)
export class PaymentController {
    constructor(
        private readonly commandBus: CommandBus,
        private readonly queryBus: QueryBus,
    ) { }

    @Post()
    @HttpCode(201)
    createPayment(@Body() dto: CreatePaymentDto) {
        return this.commandBus.execute(new CreatePaymentCommand(dto));
    }

    @Post('complete/:id')
    @HttpCode(200)
    completePayment(@Param('id', ParseIntPipe) id: number) {
        return this.commandBus.execute(new CompletePaymentCommand(id));
    }

    @Get()
    @HttpCode(200)
    getPayments() {
        return this.queryBus.execute(new GetPaymentsQuery());
    }
}
