import React, { useState } from 'react'
import { Form, Button } from 'react-bootstrap'
import Router, { useRouter } from 'next/router';
import useRequest from '../../hooks/use-request';
import ContentHeader from '../../components/content-header';
import withAuth from '../../hocs/withAuth';
import Head from 'next/head';

const types = [
    { value: 'Car' },
    { value: 'Truck' },
    { value: 'Electric' },
    { value: 'Van' },
    { value: 'Motorbike' },
]

function NewTicket() {
    const query = useRouter().query

    const [spotId, setSpotId] = useState(query.spotId || 0)
    const [licenseNumber, setLicenseNumber] = useState('')
    const [type, setType] = useState('')

    const { doRequest, errors } = useRequest({
        url: '/api/ticket',
        method: 'post',
        body: {
            spotId, licenseNumber, type
        },
        onSuccess: () => Router.push('/ticket')
    });

    const handleSubmit = async (e) => {
        e.preventDefault();

        await doRequest();
    }

    return (
        <div>
            <Head>
                <title>Create Ticket</title>
            </Head>
            <ContentHeader title="Create New Ticket" />
            <Form className="col-sm-6 mx-auto" onSubmit={handleSubmit}>
                <Form.Group className="mb-3" >
                    <Form.Label>License Number</Form.Label>
                    <Form.Control
                        value={licenseNumber} onChange={e => setLicenseNumber(e.target.value)}
                        type="text" placeholder="Enter license number" />
                </Form.Group>
                <Form.Group className="mb-3" >
                    <Form.Label>Spot Id</Form.Label>
                    <Form.Control
                        value={spotId} onChange={e => setSpotId(e.target.value)}
                        type="number" placeholder="Enter spotId" />
                </Form.Group>
                <Form.Group className="mb-3" >
                    <Form.Label>Vehicle Type</Form.Label>
                    <Form.Select
                        value={type}
                        onChange={e => setType(e.target.value)}
                        aria-label="Select a vehicle type">
                        <option
                            value={0}>
                            Select a vehicle type
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


export default withAuth(NewTicket)
