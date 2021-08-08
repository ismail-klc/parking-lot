import React from 'react'
import withAdmin from '../../hocs/withAdmin'
import buildClient from '../../helpers/build-client'

function ParkingSpots({ data }) {
    return (
        <div>
            { data.length }
        </div>
    )
}

export async function getServerSideProps(context) {
    const client = buildClient(context);

    try {
        const { data } = await client.get('/api/parking/parking-spot');
        return { props: { data } };

    } catch (error) {
        return { props: {} };
    }
}

export default withAdmin(ParkingSpots)
