import React from 'react'
import withAdmin from '../../hocs/withAdmin'
import buildClient from '../../helpers/build-client'
import ContentHeader from '../../components/content-header';
import ParkingLotCard from '../../components/parking-lot-card';
import Head from 'next/head';

function ParkingLots({ data }) {

    return (
        <div>
            <Head>
                <title>Parking Lots</title>
            </Head>
            <ContentHeader title="Parking Lots" />
            {
                data && data.map(d => (
                    <ParkingLotCard
                        data={d}
                        key={d.id}
                    />
                ))
            }
        </div>
    )
}

export async function getServerSideProps(context) {
    const client = buildClient(context);

    try {
        const { data } = await client.get('/api/parking/parking-lot');
        return { props: { data } };

    } catch (error) {
        return { props: {} };
    }
}

export default withAdmin(ParkingLots)
