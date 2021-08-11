import { CompletePaymentHandler } from "./complete-payment.handler";
import { CreatePaymentHandler } from "./create-payment.handler";

export const CommandHandlers = [
    CreatePaymentHandler,
    CompletePaymentHandler
];