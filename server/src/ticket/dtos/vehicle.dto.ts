import { IsEnum, IsNotEmpty } from "class-validator";
import { VehicleType } from "../entities/vehicle.entity";

export class VehicleDto {
    @IsNotEmpty()
    licenseNumber: string;

    @IsEnum(VehicleType)
    type: VehicleType;
}