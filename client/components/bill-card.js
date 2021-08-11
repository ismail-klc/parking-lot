import { DateTime } from 'luxon';
import Router from 'next/router';
import React, { useState } from 'react'
import { Button, Card, Form } from 'react-bootstrap';
import useRequest from '../hooks/use-request';

const types = [
    { value: 'Cash' },
    { value: 'CreditCard' }
]

function BillCard({ data }) {
    const [type, setType] = useState(0)
    const { doRequest, errors } = useRequest({
        url: '/api/payment',
        method: 'post',
        body: {
            creationDate: data.payedAt,
            amount: data.payedAmount,
            ticketId: data.id,
            type
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
                        <Form.Group className="mb-3" >
                            <Form.Label>Payment Type</Form.Label>
                            <Form.Select
                                value={type}
                                onChange={e => setType(e.target.value)}
                                aria-label="Select a payment type">
                                <option
                                    value={0}>
                                    Select a payment type
                                </option>
                                {
                                    types.map(t => (
                                        <option
                                            key={t.value}
                                            value={t.value}>
                                            {`${t.value}`}
                                        </option>
                                    ))
                                }
                            </Form.Select>
                        </Form.Group>
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
