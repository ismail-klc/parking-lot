import { BadRequestException } from '@nestjs/common';
import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Payment, PaymentType } from 'src/payment/entities/payment.entity';
import { Repository } from 'typeorm';
import { CompletePaymentCommand } from '../impl/complete-payment.command';

@CommandHandler(CompletePaymentCommand)
export class CompletePaymentHandler implements ICommandHandler<CompletePaymentCommand> {
    constructor(
        @InjectRepository(Payment)
        private paymentRepository: Repository<Payment>,
        private readonly publisher: EventPublisher,
    ) { }

    async execute(command: CompletePaymentCommand) {
        console.log("CompletePaymentCommand working");

        // send event 
        const pay = this.publisher.mergeObjectContext(
            await this.paymentRepository.findOne(+command.id),
        );
        pay.creditCardPayment();
        pay.commit();
    }
}