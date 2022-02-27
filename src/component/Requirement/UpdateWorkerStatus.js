import React, { Fragment, useState } from 'react'
import { Button, Col, Modal, Row } from 'react-bootstrap'
import Select from 'react-select'
import { RequirementStatus, WorkerStatusDropdownList } from '../../master-data'
import { WorkerUpdateStatusApi } from '../../utils/ApiFunctions'
import { filterDropdown } from '../../utils/CommonList'
import { LinkButton } from '../Controls/Buttons/Buttons'

const UpdateWorkerStatus = (props) => {

    const [requirementDetails, setRequirementDetails] = useState(props.details)
    const [workerDetails, setWorkerDetails] = useState(props.workerDetails)
    const [tempStatus, setTempStatus] = useState("")
    const [updateStatusModal, setUpdateStatusModal] = useState(false)

    const handleOpenStatusModal = () => {
        setUpdateStatusModal(true)
    }

    const closeStatusModal = () => {
        setUpdateStatusModal(false)
    }

    const handleOnChangeStatus = (e) => {
        setTempStatus(e.value)
    }

    const UpdateStatus = () => {
        const Body = {
            status: tempStatus,
            workerCode: workerDetails.Code
        }
        WorkerUpdateStatusApi(Body)
            .then(() => {
                let workerDetailsCopy = Object.assign({}, workerDetails);

                workerDetailsCopy.Status = tempStatus

                setWorkerDetails(workerDetailsCopy)

                setUpdateStatusModal(false)
            }).catch(() => {
                setUpdateStatusModal(false)
            })
    }

    return (
        <Fragment>
            {
                requirementDetails.Status === RequirementStatus.PENDING ?
                    workerDetails.Status
                :
                <LinkButton onClickEvent={handleOpenStatusModal} text={workerDetails.Status} className="p-0"/>
            }

            {/* update status modal */}
            <Modal show={updateStatusModal} onHide={closeStatusModal}>
                <Modal.Header>
                    <Modal.Title as="h5">{workerDetails.Name} - Update Worker Status </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Row>
                        <Col>
                            <label><b>Worker Status</b></label>
                            <Select
                                name="statusValue"
                                placeholder="Assign Status"
                                options={WorkerStatusDropdownList}
                                onChange={(e) => handleOnChangeStatus(e)}
                                defaultValue={filterDropdown(WorkerStatusDropdownList, workerDetails.Status)}
                                // value={filterDropdown(WorkerStatusDropdownList, workerDetails.Status)}
                                // isLoading={isLoading}
                                // components={{ LoadingIndicator }}
                            ></Select>
                        </Col>
                    </Row>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="light" onClick={closeStatusModal}>Close</Button>
                    <Button variant="primary" onClick={UpdateStatus}>Update</Button>
                </Modal.Footer>
            </Modal>
        </Fragment>
    )
}

export default UpdateWorkerStatus