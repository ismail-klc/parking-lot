import { Vehicle } from 'src/ticket/entities/vehicle.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToOne, JoinColumn } from 'typeorm';
import { ParkingFloor } from './parking-floor.entity';

export enum ParkingSpotType {
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

    @Column({ default: true })
    isFree: boolean;

    @OneToOne(() => Vehicle, { nullable: true })
    @JoinColumn()
    vehicle: Vehicle;

    @Column()
    type: ParkingSpotType;

    @ManyToOne(type => ParkingFloor, type => type.parkingSpots)
    floor: ParkingFloor;
}