import Head from 'next/head'
import Router from 'next/router'
import React, { useEffect } from 'react'
import useRequest from '../../hooks/use-request'

function Signout() {
    const { doRequest } = useRequest({
        url: '/api/auth/signout',
        method: 'post',
        body: {},
        onSuccess: () => Router.push('/auth/signin')
    })

    useEffect(() => {
        doRequest();
    }, [])

    return (
        <>
            <Head>
                <title>Signing out</title>
            </Head>
            <div className="text-center pt-5">
                Signing you out ...
            </div>
        </>
    )
}

export default Signout