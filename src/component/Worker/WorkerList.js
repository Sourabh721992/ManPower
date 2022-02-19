import React, { Fragment } from 'react'
import { Col, Row } from 'react-bootstrap'
import UserProfile from '../../utils/UserProfile'
// import Header from '../Layout/Header'
import {AddIconBtn} from '../Controls/Buttons/IconButtons'
// import { SecondaryBadge } from '../Controls/Badge/Badge'
import WorkersTable from './WorkersTable'
import { withRouter } from 'react-router-dom'

const WorkerList = (props) => {

    const session = UserProfile.getSession()

    const onClickBtn = (e) => {
        props.history.push("/addWorker")
    }

    return (
        <Fragment>
            {/* <Header session={session} /> */}

            <Row>
                <Col className='d-flex justify-content-between mx-5 mt-4'>
                    {/* <SecondaryBadge badgeText={"Unassigned Worker Inventory"}/> */}
                    <h5 className='text-muted'>Unassigned Worker Inventory</h5>
                    <AddIconBtn btnText={"Add New Worker"} onClickEvent={(e) => onClickBtn(e)} />
                </Col>
            </Row>

            <WorkersTable/>

        </Fragment>
    )
}

export default withRouter(WorkerList)