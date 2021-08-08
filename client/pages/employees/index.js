import React from 'react'
import buildClient from '../../helpers/build-client';
import withAdmin from '../../hocs/withAdmin';

function Employees({ data }) {
    return (
        <div>
            { data.length}
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
