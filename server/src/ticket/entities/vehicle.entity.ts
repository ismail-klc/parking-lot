import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToOne } from 'typeorm';
import { ParkingTicket } from './ticket.entity';

export enum VehicleType{
    Car = 'Car',
    Truck = 'Truck',
    Electric = 'Electric',
    Van = 'Van',
    Motorbike = 'Motorbike'
}

@Entity()
export class Vehicle {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    licenseNumber: string;

    @Column()
    type: VehicleType;

    @OneToMany(type => ParkingTicket, type => type.vehicle)
    parkingTickets: ParkingTicket[];
}