import { Body, Controller, Get, HttpCode, Param, ParseIntPipe, Post, UseGuards } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { CreateTicketCommand } from './commands/impl/create-ticket.command';
import { TicketDto } from './dtos/ticket.dto';
import { GetActiveTicketsQuery } from './queries/impl/get-active-tickets.query';
import { GetTicketByIdQuery } from './queries/impl/get-ticket-by-id.query';

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

    @Get('active/:id')
    @HttpCode(200)
    getTicketById(@Param('id', ParseIntPipe) id: number) {
        return this.queryBus.execute(new GetTicketByIdQuery(id));
    }
}
