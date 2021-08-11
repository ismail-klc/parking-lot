import { DateTime } from 'luxon';
import Head from 'next/head';
import React from 'react'
import { Button } from 'react-bootstrap';
import CompletePaymentBtn from '../../components/complete-payment-btn';
import ContentHeader from '../../components/content-header';
import MyDataTable from '../../components/my-table';
import buildClient from '../../helpers/build-client'
import withAuth from '../../hocs/withAuth'

const columns = [
    {
        name: 'Id',
        selector: row => row.id,
        sortable: true,
    },
    {
        name: 'Created At',
        selector: row => DateTime.fromISO(row.creationDate, { locale: "tr" }).toLocaleString(DateTime.DATETIME_MED),
        sortable: true,
    },
    {
        name: 'License Number',
        selector: row => row.ticket.vehicle.licenseNumber,
        sortable: true,
    },
    {
        name: 'Amount',
        selector: row => `${row.amount}$`,
        sortable: true,
    },
    {
        name: 'Status',
        selector: row => row.status,
        sortable: true,
    },
    {
        name: 'Vehicle Type',
        selector: row => row.paymentType,
        sortable: true,
    },
    {
        name: 'Action',
        selector: row => row.status === 'Created' &&
            <CompletePaymentBtn id={row.id} />
    },

];

function Payments({ data }) {
    console.log(data);
    if (typeof window !== 'undefined') {

        return (
            <>
                <Head>
                    <title>Payments</title>
                </Head>
                <ContentHeader title="Payments" />
                <MyDataTable
                    filteredCol1="status"
                    columns={columns}
                    filteredBoxLabel="Filter By Status"
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
        const { data } = await client.get('/api/payment');
        return { props: { data } };

    } catch (error) {
        return { props: {} };
    }
}

export default withAuth(Payments)
