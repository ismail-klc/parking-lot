import Router from 'next/router';
import React from 'react'
import { Button, Card } from 'react-bootstrap';

function ParkingSpotCard({ data }) {

    const handleTicket = () => {
        Router.push(`/ticket/new?spotId=${data.id}`)
    }

    return (
        <Card
            bg={data.isFree ? "success" : "secondary"}
            className="col-md-2 mx-3">
            <Card.Header>{data.number}</Card.Header>

            <Card.Body>
                <Card.Text as="div">
                    <div>
                        Id: &nbsp;
                        {
                            data.id
                        }
                    </div>
                    <div>
                        {
                            data.isFree ? "Free" : "Not Free"
                        }
                    </div>
                    <div>
                        {data.type}
                    </div>
                </Card.Text>
                {
                    data.isFree &&
                    <Button
                        onClick={handleTicket}
                        variant="outline-light" className="mt-2"> Create Ticket</Button>
                }
            </Card.Body>
        </Card>
    )
}

export default ParkingSpotCard
