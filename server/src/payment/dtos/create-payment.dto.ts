import { IsEnum, IsNotEmpty, IsNumber, IsNumberString } from "class-validator";
import { PaymentType } from "../entities/payment.entity";

export class CreatePaymentDto {
    @IsNotEmpty()
    creationDate: Date;

    @IsNumber()
    amount: number;

    @IsNumber()
    ticketId: number;

    @IsEnum(PaymentType)
    type: PaymentType;
}