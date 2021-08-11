import { AggregateRoot } from '@nestjs/cqrs';
import { ParkingTicket } from 'src/ticket/entities/ticket.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany, OneToOne, JoinColumn } from 'typeorm';
import { CreditCardPaymentCreatedEvent } from '../events/impl/credit-card-payment-created.event';

export enum PaymentStatus {
    Created = 'Created',
    Completed = 'Completed'
}

export enum PaymentType {
    Cash = 'Cash',
    CreditCard = 'CreditCard'
}

@Entity()
export class Payment extends AggregateRoot {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    creationDate: Date;

    @Column({ type: 'decimal' })
    amount: number;

    @Column({ default: PaymentStatus.Created })
    status: PaymentStatus;

    @Column()
    paymentType: PaymentType;

    @OneToOne(() => ParkingTicket)
    @JoinColumn()
    ticket: ParkingTicket;

    creditCardPayment() {
        // logic
        this.apply(new CreditCardPaymentCreatedEvent(this.id));
    }
}