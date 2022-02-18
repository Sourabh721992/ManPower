import React, { Fragment } from 'react'
import { AddIconBtn } from '../Controls/Buttons/IconButtons'

export default function TotalBuyerTab(props) {

    const count = props.count
    // const list = props.list

    const onClickBtn = (e) => {

    }

    return (
        <Fragment>
            <div className='d-flex justify-content-between p-4'>
                <h6>Total Buyers Count: {count}</h6>
                <AddIconBtn btnText={"Add new buyer"} onClickEvent={(e) => onClickBtn(e)} />
                {/* TODO: Card list */}
            </div>
        </Fragment>
    )
}
