import { CreatePaymentDto } from "src/payment/dtos/create-payment.dto";

export class CreatePaymentCommand {
    constructor(
      public readonly dto: CreatePaymentDto,
    ) {}
  }