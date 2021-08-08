import React, { useEffect, useState } from 'react'
import withAuth from '../../hocs/withAuth'
import buildClient from '../../helpers/build-client'
import { Form, Row } from 'react-bootstrap';
import ContentHeader from '../../components/content-header';
import ParkingSpotCard from '../../components/parking-spot-card';
import { useRouter } from 'next/router'

function ParkingSpots({ data }) {
    const query = useRouter().query

    const [lotId, setLotId] = useState(query.lotId || 0)
    const [lot, setLot] = useState(null)
    const [floorId, setFloorId] = useState(query.floorId || 0)
    const [floor, setFloor] = useState(null)
    const [freeCount, setFreeCount] = useState(0)

    const getFreeCount = () => {
        let free = 0
        for (const spot of floor.parkingSpots) {
            if (spot.isFree) {
                free += 1
            }
        }
        return free
    }

    useEffect(() => {
        if (floor) {
            setFreeCount(getFreeCount())
        }
    }, [floor, freeCount])


    useEffect(() => {
        setLot(data.find(x => x.id === parseInt(lotId)))
    }, [lotId])

    useEffect(() => {
        if (lot) {
            setFloor(lot.parkingFloors.find(x => x.id === parseInt(floorId)))
        }
    }, [lot, floorId])

    return (
        <div>
            <ContentHeader title="Parking Spots" />
            <Form.Group className="mb-3" >
                <Form.Label>Parking Lot</Form.Label>
                <Form.Select
                    value={lotId}
                    onChange={e => setLotId(e.target.value)}
                    aria-label="Select a parking lot">
                    <option
                        value={0}>
                        Select a parking lot
                    </option>
                    {
                        data.map(t => (
                            <option
                                key={t.id}
                                value={t.id}>
                                {`${t.name}`}
                            </option>
                        ))
                    }
                </Form.Select>
            </Form.Group>
            {
                lot &&
                <Form.Group className="mb-3" >
                    <Form.Label>Parking Floor</Form.Label>
                    <Form.Select
                        value={floorId}
                        onChange={e => setFloorId(e.target.value)}
                        aria-label="Select a parking floor">
                        <option
                            value={0}>
                            Select a parking lot
                        </option>
                        {
                            lot && lot.parkingFloors.map(t => (
                                <option
                                    key={t.id}
                                    value={t.id}>
                                    {`${t.name}`}
                                </option>
                            ))
                        }
                    </Form.Select>
                </Form.Group>

            }
            {
                floor &&
                <b>
                    Free Spot Count: {freeCount}
                </b>
            }
            <Row className="mt-3">
                {
                    lot && floor &&
                    floor.parkingSpots.map(a => (
                        <ParkingSpotCard key={a.id} data={a} />
                    ))
                }
            </Row>
        </div>
    )
}

export async function getServerSideProps(context) {
    const client = buildClient(context);

    try {
        const { data } = await client.get('/api/parking/parking-lot');
        return { props: { data } };

    } catch (error) {
        return { props: {} };
    }
}

export default withAuth(ParkingSpots)
