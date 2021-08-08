import React from 'react'
import Footer from './footer'
import MainSidebar from './main-sidebar'
import Navbar from './navbar'

function LayoutAuth({ children, user }) {
    return (
        <>
            <div className="wrapper">
                <Navbar />
                <MainSidebar user={user} />
                <div className="content-wrapper pb-5">
                    <section className="content">
                        <div className="container-fluid">
                            {children}
                        </div>
                    </section>
                </div>
                <Footer />
            </div>
        </>
    )
}

export default LayoutAuth
