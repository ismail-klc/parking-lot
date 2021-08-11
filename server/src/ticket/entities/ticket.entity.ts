import { ParkingLot } from 'src/parking/entities/parking-lot.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToOne } from 'typeorm';
import { Vehicle } from './vehicle.entity';

export enum ParkingTicketStatus{
    Active = 'Active', 
    Paid = 'Paid',
    Lost = 'Lost'
}

@Entity()
export class ParkingTicket {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    issuedAt: Date;

    @Column({ nullable: true})
    payedAt: Date;

    @Column({ nullable: true, type: 'decimal'})
    payedAmount: number;

    @Column({ default: ParkingTicketStatus.Active })
    status: ParkingTicketStatus;

    @ManyToOne(type => ParkingLot, type => type.parkingTickets)
    parkingLot: ParkingLot;

    @ManyToOne(type => Vehicle, type => type.parkingTickets)
    vehicle: Vehicle;
}