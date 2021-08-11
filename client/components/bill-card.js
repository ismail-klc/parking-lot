import { DateTime } from 'luxon';
import Router from 'next/router';
import React from 'react'
import { Button, Card } from 'react-bootstrap';
import useRequest from '../hooks/use-request';

function BillCard({ data }) {
    const { doRequest, errors } = useRequest({
        url: '/api/payment',
        method: 'post',
        body: {
            creationDate: data.payedAt,
            amount: data.payedAmount,
            ticketId: data.id
        },
        onSuccess: () => Router.push(`/ticket`)
    });

    console.log(typeof data.payedAmount, typeof data.id);

    const handleSubmit = async (e) => {
        e.preventDefault()
        await doRequest()
    }


    if (data) {
        return (
            <Card
                bg="light" className="col-md-6 mx-auto mt-5">
                <Card.Header>BILL</Card.Header>
                <Card.Body>
                    <Card.Text as="div">
                        <div>License Number: {data.vehicle.licenseNumber}</div>
                        <div>
                            Issued At: {DateTime.fromISO(data.issuedAt, { locale: "tr" }).toLocaleString(DateTime.DATETIME_MED)}
                        </div>
                        <div>
                            Now Date: {DateTime.fromISO(data.payedAt, { locale: "tr" }).toLocaleString(DateTime.DATETIME_MED)}
                        </div>
                        <div>
                            Total Price: {data.payedAmount}$
                        </div>
                        {
                            errors && errors
                        }
                        <Button
                            onClick={handleSubmit}
                            variant="outline-primary" className="btn-sm mt-2">Create Payment</Button>
                    </Card.Text>
                </Card.Body>
            </Card>
        )
    }
    return null
}

export default BillCard
