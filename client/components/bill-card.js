import { DateTime } from 'luxon';
import React from 'react'
import { Button, Card } from 'react-bootstrap';

function BillCard({ data }) {
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
                        <Button variant="outline-primary" className="btn-sm mt-2">Create Payment</Button>
                    </Card.Text>
                </Card.Body>
            </Card>
        )
    }
    return null
}

export default BillCard
