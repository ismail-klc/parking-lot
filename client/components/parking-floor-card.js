import React, { useEffect, useState } from 'react'
import { Card } from 'react-bootstrap';

function ParkingFloorCard({data}) {
     const [freeCount, setFreeCount] = useState(0)

    const getFreeCount = () => {
        let free = 0
        for (const spot of data.parkingSpots) {
            if (spot.isFree) {
                free += 1
            }
        }
        return free
    }

    useEffect(() => {
        setFreeCount(getFreeCount())
    }, [freeCount])

    return (
        <Card bg="light" className="col-md-12">
                <Card.Header>{data.name} </Card.Header>

            <Card.Body>
                <Card.Text as="div">
                    <ul>
                        <li>Capacity: {data.parkingSpots.length}</li>
                        <li>Free Spots: {freeCount}</li>
                    </ul>
                </Card.Text>
            </Card.Body>
        </Card>
    )
}

export default ParkingFloorCard