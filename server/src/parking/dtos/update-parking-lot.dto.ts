import { IsNumberString } from "class-validator";
import { AddParkingLotDto } from "./add-parking-lot-dto";

export class UpdateParkingLotDto extends AddParkingLotDto{
    @IsNumberString()
    lotId: number;
}