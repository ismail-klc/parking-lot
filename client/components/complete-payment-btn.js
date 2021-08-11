import Router from 'next/router'
import React from 'react'
import { Button } from 'react-bootstrap'
import useRequest from '../hooks/use-request';

function CompletePaymentBtn({ id }) {
    const { doRequest, errors } = useRequest({
        url: `/api/payment/complete/${id}`,
        method: 'post',
        body: {
        },
        onSuccess: () => Router.push('/payments')
    });

    const handleSubmit = async (e) => {
        e.preventDefault();

        await doRequest();
    }
    return (
        <Button
            onClick={handleSubmit}
            className="btn-sm m-1" variant="outline-primary">Complete</Button>
    )
}

export default CompletePaymentBtn
