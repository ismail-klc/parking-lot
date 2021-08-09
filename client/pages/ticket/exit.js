import React, { useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import ContentHeader from '../../components/content-header';
import withAuth from '../../hocs/withAuth'
import axios from 'axios';

function Payment() {
    const [ticketId, setTicketId] = useState(0)

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await axios.get('http://localhost:3000/api/ticket/active', { withCredentials: true })
            console.log(res.data);
        } catch (error) {
        }
    }

    return (
        <div>
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
        </div>
    )
}

export default withAuth(Payment)
