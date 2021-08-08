import React, { useEffect, useState } from 'react'
import withAuth from '../../hocs/withAuth'
import buildClient from '../../helpers/build-client'
import { Form } from 'react-bootstrap';
import ParkingFloorCard from '../../components/parking-floor-card';
import ContentHeader from '../../components/content-header';
import { useRouter } from 'next/router'

function ParkingFloors({ data }) {
    const query = useRouter().query

    const [lotId, setLotId] = useState(query.lotId || 0)
    const [lot, setLot] = useState(null)
    const [freeCount, setFreeCount] = useState(0)

    const getFreeCount = () => {
        let free = 0
        for (const floor of lot.parkingFloors) {
            for (const spot of floor.parkingSpots) {
                if (spot.isFree) {
                    console.log(spot);
                    free += 1
                }
            }
        }
        return free
    }

    useEffect(() => {
        if (lot) {
            setFreeCount(getFreeCount())
        }
    }, [lot, freeCount])

    useEffect(() => {
        setLot(data.find(x => x.id === parseInt(lotId)))
    }, [lotId])

    return (
        <div>
            <ContentHeader title="Parking Floor" />
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
                <div className="mb-4">
                    <b>Free Spots Count: {freeCount} </b>
                </div>
            }
            {
                lot && lot.parkingFloors.map(p => (
                    <ParkingFloorCard lotid={lotId} key={p.id} data={p} />
                ))
            }
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

export default withAuth(ParkingFloors)
