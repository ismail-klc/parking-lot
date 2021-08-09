import { Body, Controller, Get, HttpCode, Post, UseGuards } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { CreateTicketCommand } from './commands/impl/create-ticket.command';
import { TicketDto } from './dtos/ticket.dto';
import { GetActiveTicketsQuery } from './queries/impl/get-active-tickets.query';

@Controller('ticket')
@UseGuards(AuthGuard)
export class TicketController {
    constructor(
        private readonly commandBus: CommandBus,
        private readonly queryBus: QueryBus,
    ) { }

    @Post()
    @HttpCode(201)
    createTicket(@Body() dto: TicketDto) {
        return this.commandBus.execute(new CreateTicketCommand(dto));
    }

    @Get('active')
    @HttpCode(200)
    getActiveTickets() {
        return this.queryBus.execute(new GetActiveTicketsQuery());
    }
}
