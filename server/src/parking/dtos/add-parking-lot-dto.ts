import { IsNotEmpty, IsNumber, IsNumberString } from "class-validator";

export class AddParkingLotDto {
  @IsNotEmpty()
  streetAddress: string;

  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  city: string;

  @IsNotEmpty()
  state: string;

  @IsNotEmpty()
  zipcode: string;

  @IsNotEmpty()
  country: string;

  @IsNumber()
  parkingRate: number;
}