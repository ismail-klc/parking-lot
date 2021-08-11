import React, { useState } from 'react'
import withAdmin from '../../hocs/withAdmin'
import { Form, Button } from 'react-bootstrap'
import Router from 'next/router';
import useRequest from '../../hooks/use-request';
import ContentHeader from '../../components/content-header';
import Head from 'next/head';

function NewParkingLot() {
    const [name, setName] = useState('')
    const [streetAddress, setStreetAddress] = useState('')
    const [city, setCity] = useState('')
    const [state, setState] = useState('')
    const [zipcode, setZipcode] = useState('')
    const [country, setCountry] = useState('')
    const [parkingRate, setParkingRate] = useState(0)

    const { doRequest, errors } = useRequest({
        url: '/api/parking/parking-lot',
        method: 'post',
        body: {
            name, streetAddress, city, state, zipcode, country, parkingRate
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
                <title>New Parking Lot</title>
            </Head>
            <ContentHeader title="Add Parking Lot" />
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
                    Submit
                </Button>
            </Form>
        </div>
    )
}

export default withAdmin(NewParkingLot)
