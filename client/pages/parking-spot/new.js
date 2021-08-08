import React, { useEffect, useState } from 'react'
import withAdmin from '../../hocs/withAdmin'
import { Form, Button } from 'react-bootstrap'
import Router from 'next/router';
import useRequest from '../../hooks/use-request';
import ContentHeader from '../../components/content-header';
import buildClient from '../../helpers/build-client'

const types = [
    { value: 'HandicappedSpot' },
    { value: 'CompactSpot' },
    { value: 'LargeSpot' },
    { value: 'MotorbikeSpot' },
    { value: 'ElectricSpot' },
]

function NewParkingSpot({ parkingLots }) {
    const [number, setNumber] = useState('')
    const [lotId, setLotId] = useState(0)
    const [floorId, setFloorId] = useState(0)
    const [type, setType] = useState(0)
    const [lot, setLot] = useState(null)

    const { doRequest, errors } = useRequest({
        url: '/api/parking/parking-spot',
        method: 'post',
        body: {
            number, floorId, type
        },
        onSuccess: () => Router.push('/parking-spot')
    });

    const handleSubmit = async (e) => {
        e.preventDefault();

        await doRequest();
    }

    useEffect(() => {
        setLot(parkingLots.find(x => x.id === parseInt(lotId)))
    }, [lotId])

    return (
        <div>
            <ContentHeader title="Add Parking Spot" />
            <Form className="col-sm-6 mx-auto" onSubmit={handleSubmit}>
                <Form.Group className="mb-3" >
                    <Form.Label>Number</Form.Label>
                    <Form.Control
                        value={number} onChange={e => setNumber(e.target.value)}
                        type="text" placeholder="Enter a number" />
                </Form.Group>
                <Form.Group className="mb-3" >
                    <Form.Label>Parking Spot Type</Form.Label>
                    <Form.Select
                        value={type}
                        onChange={e => setType(e.target.value)}
                        aria-label="Select a parking lot">
                        <option
                            value={0}>
                            Select a parking spot type
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
                            parkingLots.map(t => (
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
                    errors && errors
                }
                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        </div>
    )
}

export async function getServerSideProps(context) {
    const client = buildClient(context);

    try {
        const res = await client.get('/api/parking/parking-lot');
        const parkingLots = res.data;

        return { props: { parkingLots } };
    } catch (error) {
        return { props: {} };
    }
}

export default withAdmin(NewParkingSpot)
