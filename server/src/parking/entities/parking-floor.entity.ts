import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToOne } from 'typeorm';
import { ParkingLot } from './parking-lot.entity';
import { ParkingSpot } from './parking-spot.entity';

@Entity()
export class ParkingFloor {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @ManyToOne(type => ParkingLot, type => type.parkingFloors)
    lot: ParkingLot;

    @OneToMany(type => ParkingSpot, type => type.floor)
    parkingSpots: ParkingSpot[];
}