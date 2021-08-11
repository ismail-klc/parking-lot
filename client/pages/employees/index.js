import Head from 'next/head';
import React from 'react'
import { Row } from 'react-bootstrap';
import ContentHeader from '../../components/content-header';
import EmployeeCard from '../../components/employee-card';
import buildClient from '../../helpers/build-client';
import withAdmin from '../../hocs/withAdmin';

function Employees({ data }) {
    return (
        <div>
            <Head>
                <title>Employees</title>
            </Head>
            <ContentHeader title="Employees" />
            <Row className="mx-auo">
                {
                    data.map(d => (
                        <EmployeeCard
                            key={d.id}
                            data={d}
                        />
                    ))
                }
            </Row>
        </div>
    )
}

export async function getServerSideProps(context) {
    const client = buildClient(context);

    try {
        const { data } = await client.get('/api/auth/users');
        return { props: { data } };

    } catch (error) {
        return { props: {} };
    }
}

export default withAdmin(Employees)
