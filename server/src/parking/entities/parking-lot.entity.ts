import { ParkingTicket } from 'src/ticket/entities/ticket.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { ParkingFloor } from './parking-floor.entity';

@Entity()
export class ParkingLot {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    streetAddress: string;

    @Column()
    city: string;

    @Column()
    state: string;

    @Column()
    zipcode: string;

    @Column()
    country: string;

    @Column()
    parkingRate: number;

    @OneToMany(type => ParkingFloor, type => type.lot)
    parkingFloors: ParkingFloor[];

    @OneToMany(type => ParkingTicket, type => type.parkingLot)
    parkingTickets: ParkingTicket[];
}