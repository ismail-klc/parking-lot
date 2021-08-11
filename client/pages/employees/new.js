import React, { useEffect, useState } from 'react'
import withAdmin from '../../hocs/withAdmin'
import { Form, Button } from 'react-bootstrap'
import Router from 'next/router';
import useRequest from '../../hooks/use-request';
import ContentHeader from '../../components/content-header';
import buildClient from '../../helpers/build-client'
import Head from 'next/head';

const types = [
    { value: 'Admin' },
    { value: 'Attendant' },
]

function NewEmployee({ parkingLots }) {
    const [fullName, setFullName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [role, setRole] = useState(0)

    const { doRequest, errors } = useRequest({
        url: '/api/auth/create',
        method: 'post',
        body: {
            fullName, email, password, role
        },
        onSuccess: () => Router.push('/employees')
    });

    const handleSubmit = async (e) => {
        e.preventDefault();

        await doRequest();
    }

    return (
        <div>
            <Head>
                <title>New Employee</title>
            </Head>
            <ContentHeader title="Add New Employee" />
            <Form className="col-sm-6 mx-auto" onSubmit={handleSubmit}>
                <Form.Group className="mb-3" >
                    <Form.Label>Full Name</Form.Label>
                    <Form.Control
                        value={fullName} onChange={e => setFullName(e.target.value)}
                        type="text" placeholder="Enter full name" />
                </Form.Group>
                <Form.Group className="mb-3" >
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                        value={email} onChange={e => setEmail(e.target.value)}
                        type="email" placeholder="Enter an email" />
                </Form.Group>
                <Form.Group className="mb-3" >
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        value={password} onChange={e => setPassword(e.target.value)}
                        type="password" placeholder="Enter password" />
                </Form.Group>
                <Form.Group className="mb-3" >
                    <Form.Label>Role</Form.Label>
                    <Form.Select
                        value={role}
                        onChange={e => setRole(e.target.value)}
                        aria-label="Select role">
                        <option
                            value={0}>
                            Select role
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


export default withAdmin(NewEmployee)
