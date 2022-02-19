import React, { Fragment } from 'react'
import PendingList from './PendingList'

export default function PendingBuyerTab(props) {

    const count = props.count
    const list = props.list

    return (
        <Fragment>
            <h6 className='m-4'>Pending Buyers Count: {count}</h6>

            <PendingList pendingList={list} response={(res) => props.response(res)} />
        </Fragment>
    )
}
