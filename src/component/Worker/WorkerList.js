import React, { Fragment, useState, useEffect } from 'react'
// import { Col, Row } from 'react-bootstrap'
import UserProfile from '../../utils/UserProfile'
// import Header from '../Layout/Header'
import { AddIconBtn } from '../Controls/Buttons/IconButtons'
// import { SecondaryBadge } from '../Controls/Badge/Badge'
import WorkersTable from './WorkersTable'
import { withRouter } from 'react-router-dom'
import { GetWorkerListApi } from '../../utils/ApiFunctions'
import Filter from '../Dashboard/Filter'

const WorkerList = (props) => {

    const session = UserProfile.getSession()

    const [workerList, setWorkerList] = useState([])
    const [filteredWorkerList, setFilteredWorkerList] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        // call get api
        GetWorkerListApi({ supplierId: session.UserId /*"S8"*/ })
            .then((response) => {
                setIsLoading(false)
                let workerListCopy = [...workerList]
                // let filteredWorkerListCopy = [...workerList]

                if (response.Code === 0) {
                    // SuccessNotify(response.Message)
                }
                if (response.Code === 1 && response.Message) {
                    workerListCopy = JSON.parse(response.Message)
                    setWorkerList(workerListCopy)
                    setFilteredWorkerList(workerListCopy)
                    // logger.log(workerListCopy)
                }
            }).catch(() => {
                setIsLoading(false)
            })

    }, [])

    const onClickBtn = (e) => {
        props.history.push("/addWorker")
    }

    const handleFromChild = (action, data) => {
        let filteredWorkerListCopy = [...filteredWorkerList]
        if (data && action === "filterApplied") {
            filteredWorkerListCopy = data
        }
        else if (action === "clearFilter") {
            filteredWorkerListCopy = workerList
        }
        setFilteredWorkerList(filteredWorkerListCopy)
    }

    return (
        <Fragment>
            {/* <Header session={session} /> */}
            <div className='mx-5 mt-4'>
                <div className='d-flex'>
                    <h5 className='text-muted flex-grow-1'>Unassigned Worker Inventory</h5>
                    <Filter originalData={filteredWorkerList} UpdateParent={handleFromChild} for={"workerList"} />
                    <AddIconBtn btnText={"Add New Worker"} onClickEvent={(e) => onClickBtn(e)} />
                </div>
                <hr />
                <WorkersTable workerList={filteredWorkerList} isLoading={isLoading} />
            </div>

        </Fragment>
    )
}

export default withRouter(WorkerList)