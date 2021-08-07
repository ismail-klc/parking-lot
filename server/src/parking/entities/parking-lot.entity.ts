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

    @OneToMany(type => ParkingFloor, type => type.lot)
    parkingFloors: ParkingFloor[];
}