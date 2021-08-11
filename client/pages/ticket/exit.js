import React, { useEffect, useState } from 'react'
import { Alert, Button, Card, Form } from 'react-bootstrap'
import ContentHeader from '../../components/content-header';
import withAuth from '../../hocs/withAuth'
import axios from 'axios';
import { useRouter } from 'next/router';
import BillCard from '../../components/bill-card';
import useRequest from '../../hooks/use-request';
import Head from 'next/head';

const useMountEffect = (fun) => useEffect(fun, [])

function Payment() {
    const query = useRouter().query
    const [ticketId, setTicketId] = useState(query.ticketId || 0)
    const [ticket, setTicket] = useState(null)
    const [notFound, setNotFound] = useState(false)


    const handleSubmit = async (e) => {
        if (e) {
            e.preventDefault()
        }

        try {
            const res = await axios.get(
                `http://localhost:3000/api/ticket/active/${ticketId}`,
                { withCredentials: true })
            setTicket(res.data)
            setNotFound(false)
        } catch (error) {
            setTicket(null)
            setNotFound(true)
        }
    }

    useMountEffect(() => {
        if (ticketId !== 0) {
            handleSubmit()
        }
    })

    return (
        <div>
            <Head>
                <title>Exit Panel</title>
            </Head>
            <ContentHeader title="Payment Process" />
            <Form className="col-sm-6 mx-auto" onSubmit={handleSubmit}>
                <Form.Group className="mb-3" >
                    <Form.Label>Ticket Id</Form.Label>
                    <Form.Control
                        value={ticketId} onChange={e => setTicketId(e.target.value)}
                        type="number" placeholder="Enter ticket id" />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
            {
                ticket &&
                <BillCard data={ticket} />
            }
            {
                notFound &&
                <Alert variant="danger" className="col-md-6 mx-auto mt-4">
                    Ticket not found
                </Alert>
            }
        </div>
    )
}

export default withAuth(Payment)
