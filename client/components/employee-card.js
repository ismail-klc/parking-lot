import React from 'react'
import { Card } from 'react-bootstrap';

function EmployeeCard({ data }) {
    console.log(data);
    return (
        <Card
            className="col-md-3 mx-auto">
                <Card.Header>{data.name}</Card.Header>

            <Card.Body>
                <Card.Text as="div">
                    <div>{data.email}</div>
                    <div>{data.role}</div>
                </Card.Text>
            </Card.Body>
        </Card>
    )
}

export default EmployeeCard
