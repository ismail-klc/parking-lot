import { NotFoundException } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Payment } from 'src/payment/entities/payment.entity';
import { Repository } from 'typeorm';
import { GetPaymentsQuery } from '../impl/get-payments.query';

@QueryHandler(GetPaymentsQuery)
export class GetPaymentsHandler implements IQueryHandler<GetPaymentsQuery> {
    constructor(
        @InjectRepository(Payment)
        private repository: Repository<Payment>,
    ) { }

    async execute(query: GetPaymentsQuery) {
        console.log('Async GetPaymentsQuery...');
        const payments = await this.repository.find({ relations: ['ticket']});
        if (!payments) {
            throw new NotFoundException('No payments');
        }

        return payments;
    }
}