import { IsNotEmpty, IsNumberString } from "class-validator";

export class AddParkingFloorDto {
    @IsNotEmpty()
    name: string;

    @IsNumberString()
    lotId: number;
}