import React from 'react'
import withAuth from '../../hocs/withAuth'

function Tickets() {
    return (
        <div>
            active tickets
        </div>
    )
}

export default withAuth(Tickets)
