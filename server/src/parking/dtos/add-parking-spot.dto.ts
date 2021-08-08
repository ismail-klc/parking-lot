import { IsEnum, IsNotEmpty, IsNumberString } from "class-validator";
import { ParkingSpotType } from "../entities/parking-spot.entity";

export class AddParkingSpotDto {
    @IsNotEmpty()
    number: string;

    @IsNumberString()
    floorId: string;

    @IsEnum(ParkingSpotType)
    type: ParkingSpotType;
}