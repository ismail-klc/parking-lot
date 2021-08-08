import React from 'react'
import { Card } from 'react-bootstrap';

function ParkingSpotCard({ data }) {
    return (
        <Card
            bg={data.isFree ? "success" : "secondary"}
            className="col-md-2 mx-3">
                <Card.Header>{data.number}</Card.Header>

            <Card.Body>
                <Card.Text as="div">
                    <div>
                        {
                            data.isFree ? "Free" : "Not Free"
                        }
                    </div>
                    <div>
                        {data.type}
                    </div>
                </Card.Text>
            </Card.Body>
        </Card>
    )
}

export default ParkingSpotCard
