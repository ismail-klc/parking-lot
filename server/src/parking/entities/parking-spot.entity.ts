import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { ParkingFloor } from './parking-floor.entity';

export enum ParkingSpotType{
    HandicappedSpot = 'HandicappedSpot',
    CompactSpot = 'CompactSpot',
    LargeSpot = 'LargeSpot',
    MotorbikeSpot = 'MotorbikeSpot',
    ElectricSpot = 'ElectricSpot'
}

@Entity()
export class ParkingSpot {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    number: string;

    @Column()
    isFree: boolean;

    @Column()
    type: ParkingSpotType;

    @ManyToOne(type => ParkingFloor, type => type.parkingSpots)
    floor: ParkingFloor;
}