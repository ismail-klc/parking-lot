import { IsNotEmpty, IsNumber, IsNumberString } from "class-validator";

export class CreatePaymentDto {
    @IsNotEmpty()
    creationDate: Date;

    @IsNumber()
    amount: number;

    @IsNumber()
    ticketId: number;
}