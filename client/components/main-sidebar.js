import Link from 'next/link'
import React from 'react'

function MainSidebar({ user }) {
    return (
        <aside className="main-sidebar sidebar-dark-primary elevation-4">
            <Link href="/">
                <a className="brand-link">
                    <span className="brand-text font-weight-light ml-4">
                        <b>LMS</b>
                    </span>
                </a>
            </Link>
            <div className="user-panel mt-3 pb-3 mb-3 d-flex">
                <div className="image">
                    {/* <img src="/img/user.jpg" className="img-circle elevation-2" alt="User Image" /> */}
                </div>
                <div className="info">
                    <span
                        style={{ color: '#fff' }}
                        className="d-block">{user.email}</span>
                    <span
                        style={{ color: '#fff' }}
                        className="d-block">{user.role}</span>
                </div>
            </div>
            <div className="sidebar">
                <nav className="mt-2">
                    <ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
                        {
                            user.role === 'Admin' &&
                            <>
                                <li className="nav-header ml-2">PARKING</li>

                                <li className="nav-item has-treeview">
                                    <a href="#" className="nav-link">
                                        <i className="nav-icon fas fa-chart-pie" />
                                        <p>
                                            Parking Lot
                                            <i className="right fas fa-angle-left" />
                                        </p>
                                    </a>
                                    <ul className="nav nav-treeview">
                                        <li className="nav-item">
                                            <Link href="/parking-lot" >
                                                <a className="nav-link">
                                                    <i className="nav-icon far fa-circle"></i>
                                                    <p>
                                                        Parking Lots
                                                    </p>
                                                </a>
                                            </Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link href="/parking-lot/new" >
                                                <a className="nav-link">
                                                    <i className="nav-icon far fa-circle"></i>
                                                    <p>
                                                        Add Parking Lot
                                                    </p>
                                                </a>
                                            </Link>
                                        </li>
                                    </ul>
                                </li>
                                <li className="nav-item has-treeview">
                                    <a href="#" className="nav-link">
                                        <i className="nav-icon fas fa-chart-pie" />
                                        <p>
                                            Parking Floor
                                            <i className="right fas fa-angle-left" />
                                        </p>
                                    </a>
                                    <ul className="nav nav-treeview">
                                        <li className="nav-item">
                                            <Link href="/parking-floor" >
                                                <a className="nav-link">
                                                    <i className="nav-icon far fa-circle"></i>
                                                    <p>
                                                        Parking Floor
                                                    </p>
                                                </a>
                                            </Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link href="/parking-floor/new" >
                                                <a className="nav-link">
                                                    <i className="nav-icon far fa-circle"></i>
                                                    <p>
                                                        Add Parking Floor
                                                    </p>
                                                </a>
                                            </Link>
                                        </li>
                                    </ul>
                                </li>
                                <li className="nav-item has-treeview">
                                    <a href="#" className="nav-link">
                                        <i className="nav-icon fas fa-chart-pie" />
                                        <p>
                                            Parking Spot
                                            <i className="right fas fa-angle-left" />
                                        </p>
                                    </a>
                                    <ul className="nav nav-treeview">
                                        <li className="nav-item">
                                            <Link href="/parking-spot" >
                                                <a className="nav-link">
                                                    <i className="nav-icon far fa-circle"></i>
                                                    <p>
                                                        Parking Spots
                                                    </p>
                                                </a>
                                            </Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link href="/parking-spot/new" >
                                                <a className="nav-link">
                                                    <i className="nav-icon far fa-circle"></i>
                                                    <p>
                                                        Add Parking Spot
                                                    </p>
                                                </a>
                                            </Link>
                                        </li>
                                    </ul>
                                </li>


                                <li className="nav-header">EMPLOYEE</li>
                                <li className="nav-item has-treeview">
                                    <a href="#" className="nav-link">
                                        <i className="nav-icon fas fa-chart-pie" />
                                        <p>
                                            Employee
                                            <i className="right fas fa-angle-left" />
                                        </p>
                                    </a>
                                    <ul className="nav nav-treeview">
                                        <li className="nav-item">
                                            <Link href="/employees" >
                                                <a className="nav-link">
                                                    <i className="nav-icon far fa-circle"></i>
                                                    <p>
                                                        Employees
                                                    </p>
                                                </a>
                                            </Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link href="/employees/new" >
                                                <a className="nav-link">
                                                    <i className="nav-icon far fa-circle"></i>
                                                    <p>
                                                        Add New Employee
                                                    </p>
                                                </a>
                                            </Link>
                                        </li>
                                    </ul>
                                </li>
                            </>
                        }


                    </ul>
                </nav>
            </div>
        </aside>
    )
}

export default MainSidebar