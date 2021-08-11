import Router from 'next/router';
import React, { useEffect, useState } from 'react'
import { Button, Card } from 'react-bootstrap';

function ParkingLotCard({ data }) {
    const [capacity, setCapacity] = useState(0)

    const getCapacity = () => {
        let capacity = 0
        for (const floor of data.parkingFloors) {
            capacity += floor.parkingSpots.length
        }
        return capacity
    }

    const handleClick = () => Router.push(`/parking-lot/${data.id}`)

    useEffect(() => {
        setCapacity(getCapacity())
    }, [capacity])

    return (
        <Card
            className="col-md-12">
            <Card.Body>
                <Card.Title>{data.name}</Card.Title>
                <Card.Text as="div">
                    <ul>
                        <li>Street: {data.streetAddress}</li>
                        <li>State: {data.state}</li>
                        <li>City: {data.city}</li>
                        <li>Country: {data.country}</li>
                        <li>Zipcode: {data.zipcode}</li>
                        <li>Floor Number: {data.parkingFloors.length}</li>
                        <li>Capacity: {capacity}</li>
                        <li>Parking Rate: {data.parkingRate}$</li>
                    </ul>
                    <Button
                        onClick={handleClick}
                        variant="outline-dark" className="btn-sm">Update</Button>
                </Card.Text>
            </Card.Body>
        </Card>
    )
}

export default ParkingLotCard
