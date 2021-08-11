import { ParkingTicket } from 'src/ticket/entities/ticket.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany, OneToOne, JoinColumn } from 'typeorm';

export enum PaymentStatus {
    Created = 'Created',
    Complete = 'Complete'
}

@Entity()
export class Payment {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    creationDate: Date;

    @Column({ type: 'decimal' })
    amount: number;

    @Column({ default: PaymentStatus.Created })
    status: PaymentStatus;

    @OneToOne(() => ParkingTicket)
    @JoinColumn()
    ticket: ParkingTicket;
}