import { IsNumberString } from "class-validator";
import { VehicleDto } from "./vehicle.dto";

export class TicketDto extends VehicleDto{
    @IsNumberString()
    spotId: number;
}