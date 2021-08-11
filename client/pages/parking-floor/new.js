import React, { useState } from 'react'
import withAdmin from '../../hocs/withAdmin'
import { Form, Button } from 'react-bootstrap'
import Router from 'next/router';
import useRequest from '../../hooks/use-request';
import ContentHeader from '../../components/content-header';
import buildClient from '../../helpers/build-client'
import Head from 'next/head';

function NewParkingFloor({ parkingLots }) {
    const [name, setName] = useState('')
    const [lotId, setLotId] = useState(0)

    const { doRequest, errors } = useRequest({
        url: '/api/parking/parking-floor',
        method: 'post',
        body: {
            name, lotId
        },
        onSuccess: () => Router.push(`/parking-floor?lotId=${lotId}`)
    });

    const handleSubmit = async (e) => {
        e.preventDefault();

        await doRequest();
    }

    return (
        <div>
            <Head>
                <title>New Parking Floor</title>
            </Head>
            <ContentHeader title="Add Parking Floor" />
            <Form className="col-sm-6 mx-auto" onSubmit={handleSubmit}>
                <Form.Group className="mb-3" >
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                        value={name} onChange={e => setName(e.target.value)}
                        type="text" placeholder="Enter a name" />
                </Form.Group>
                <Form.Group className="mb-3" >
                    <Form.Label>Parking Lot</Form.Label>
                    <Form.Select
                        value={lotId}
                        onChange={e => setLotId(e.target.value)}
                        aria-label="Select a parking lot">
                        <option
                            value="0">
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

export default withAdmin(NewParkingFloor)
