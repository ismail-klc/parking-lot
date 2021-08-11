export class CreditCardPaymentCreatedEvent{
    constructor(
        public readonly paymentId: number,
      ) {}
}