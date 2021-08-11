import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Payment, PaymentStatus } from 'src/payment/entities/payment.entity';
import { Repository } from 'typeorm';
import { CreditCardPaymentCreatedEvent } from '../impl/credit-card-payment-created.event';

@EventsHandler(CreditCardPaymentCreatedEvent)
export class CreditCardPaymentHandler implements IEventHandler<CreditCardPaymentCreatedEvent> {
    constructor(
        @InjectRepository(Payment)
        private paymentRepository: Repository<Payment>,
    ) { }

    async handle(event: CreditCardPaymentCreatedEvent) {
        console.log('Async CreditCardPaymentCreatedEvent...');

        const payment = await this.paymentRepository.findOne(event.paymentId);
        if (!payment) {
            console.log("Payment not found");
        }

        payment.status = PaymentStatus.Completed;
        return this.paymentRepository.save(payment);
    }
}