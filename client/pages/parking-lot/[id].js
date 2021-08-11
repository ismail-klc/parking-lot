import React, { useState } from 'react'
import withAdmin from '../../hocs/withAdmin'
import { Form, Button } from 'react-bootstrap'
import Router, { useRouter } from 'next/router';
import useRequest from '../../hooks/use-request';
import ContentHeader from '../../components/content-header';
import Head from 'next/head';
import buildClient from '../../helpers/build-client'

function ParkingLot({ data }) {
    const router = useRouter()
    const lotId = router.query.id
    const [name, setName] = useState(data.name)
    const [streetAddress, setStreetAddress] = useState(data.streetAddress)
    const [city, setCity] = useState(data.city)
    const [state, setState] = useState(data.state)
    const [zipcode, setZipcode] = useState(data.zipcode)
    const [country, setCountry] = useState(data.country)
    const [parkingRate, setParkingRate] = useState(data.parkingRate)

    const { doRequest, errors } = useRequest({
        url: '/api/parking/parking-lot',
        method: 'put',
        body: {
            lotId, name, streetAddress, city, state, zipcode, country, parkingRate: parseInt(parkingRate)
        },
        onSuccess: () => Router.push('/parking-lot')
    });

    const handleSubmit = async (e) => {
        e.preventDefault();

        await doRequest();
    }

    return (
        <div>
            <Head>
                <title>Update Parking Lot</title>
            </Head>
            <ContentHeader title="Update Parking Lot" />
            <Form className="col-sm-6 mx-auto" onSubmit={handleSubmit}>
                <Form.Group className="mb-3" >
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                        value={name} onChange={e => setName(e.target.value)}
                        type="text" placeholder="Enter a name" />
                </Form.Group>
                <Form.Group className="mb-3" >
                    <Form.Label>Country</Form.Label>
                    <Form.Control
                        value={country} onChange={e => setCountry(e.target.value)}
                        type="text" placeholder="Enter a country" />
                </Form.Group>
                <Form.Group className="mb-3" >
                    <Form.Label>City</Form.Label>
                    <Form.Control
                        value={city} onChange={e => setCity(e.target.value)}
                        type="text" placeholder="Enter a city" />
                </Form.Group>
                <Form.Group className="mb-3" >
                    <Form.Label>State</Form.Label>
                    <Form.Control
                        value={state} onChange={e => setState(e.target.value)}
                        type="text" placeholder="Enter a state" />
                </Form.Group>
                <Form.Group className="mb-3" >
                    <Form.Label>Street Address</Form.Label>
                    <Form.Control
                        value={streetAddress} onChange={e => setStreetAddress(e.target.value)}
                        type="text" placeholder="Enter a street address" />
                </Form.Group>
                <Form.Group className="mb-3" >
                    <Form.Label>Zipcode</Form.Label>
                    <Form.Control
                        value={zipcode} onChange={e => setZipcode(e.target.value)}
                        type="text" placeholder="Enter a zipcode" />
                </Form.Group>
                <Form.Group className="mb-3" >
                    <Form.Label>Parking Rate</Form.Label>
                    <Form.Control
                        value={parkingRate} onChange={e => setParkingRate(e.target.value)}
                        type="number" placeholder="Enter a parking rate" />
                </Form.Group>
                {
                    errors && errors
                }
                <Button variant="primary" type="submit">
                    Update
                </Button>
            </Form>
        </div>
    )
}

export async function getServerSideProps(context) {
    const client = buildClient(context);

    try {
        const { data } = await client.get(`/api/parking/parking-lot/${context.params.id}`);
        return { props: { data } };

    } catch (error) {
        return {
            notFound: true,
        }
    }
}

export default withAdmin(ParkingLot)
