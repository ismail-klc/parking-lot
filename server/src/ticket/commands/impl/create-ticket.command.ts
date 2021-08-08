import { TicketDto } from "src/ticket/dtos/ticket.dto";

export class CreateTicketCommand {
    constructor(
      public readonly dto: TicketDto,
    ) {}
  }