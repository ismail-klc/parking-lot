import Link from 'next/link';
import React from 'react'

function DashboardCart({ data }) {
    const types = [
        { label: 'Parking Lot Name', value: data.lot.name, bg: 'bg-info' },
        { label: 'Total Capacity', value: data.capacity, bg: 'bg-warning' },
        { label: 'Free Spots', value: data.freeSpots, bg: 'bg-danger' },
        { label: 'Parking Rate', value: `${data.lot.parkingRate} $`, bg: 'bg-success' },
        { label: 'Parking Floors', value: data.parkingFloorsCount, bg: 'bg-danger' },
        { label: 'Daily Entrance', value: data.dailyEntrance, bg: 'bg-success' },
        { label: 'Daily Earnings', value: `${data.dailyEarnings} $`, bg: 'bg-info' },

    ]
    return (
        <div className="row">
            {
                types.map((a, index) => (
                    <div className="col-lg-3 col-6" key={index}>
                        <div className={`small-box ${a.bg}`}>
                            <div className="inner">
                                <h4>{a.value}</h4>
                                <p>{a.label}</p>
                            </div>
                            <div className="icon">
                                <i className="ion ion-bag" />
                            </div>
                            <a className="small-box-footer" >More info <i className="fas fa-arrow-circle-right" /></a>
                        </div>
                    </div>
                ))
            }
        </div>
    )
}

export default DashboardCart