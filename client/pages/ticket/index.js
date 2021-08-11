import React from 'react'
import withAuth from '../../hocs/withAuth'
import buildClient from '../../helpers/build-client'
import MyDataTable from '../../components/my-table';
import ContentHeader from '../../components/content-header';
import Router from 'next/router';
import { DateTime } from "luxon";
import { Button } from 'react-bootstrap';
import Head from 'next/head';

const columns = [
    {
        name: 'Id',
        selector: row => row.id,
        sortable: true,
    },
    {
        name: 'Issued At',
        selector: row => DateTime.fromISO(row.issuedAt, { locale: "tr" }).toLocaleString(DateTime.DATETIME_MED),
        sortable: true,
    },

    {
        name: 'Status',
        selector: row => row.status,
        sortable: true,
    },
    {
        name: 'License Number',
        selector: row => row.vehicle.licenseNumber,
        sortable: true,
    },
    {
        name: 'Vehicle Type',
        selector: row => row.vehicle.type,
        sortable: true,
    },
    {
        name: 'Action',
        selector: row => <Button
            onClick={() => Router.push(`/ticket/exit?ticketId=${row.id}`)}
            className="btn-sm m-1" variant="outline-primary">Payment</Button>
    },

];

function Tickets({ data }) {
    if (typeof window !== 'undefined') {

        return (
            <>
                <Head>
                    <title>Active Tickets</title>
                </Head>
                <ContentHeader title="Active Tickets" />
                <MyDataTable
                    columns={columns}
                    filteredCol1="vehicle"
                    filteredCol2="licenseNumber"
                    filteredBoxLabel="Filter By License Number"
                    data={data}
                />
            </>
        )
    }
    return null
}

export async function getServerSideProps(context) {
    const client = buildClient(context);

    try {
        const { data } = await client.get('/api/ticket/active');
        return { props: { data } };

    } catch (error) {
        return { props: {} };
    }
}

export default withAuth(Tickets)
