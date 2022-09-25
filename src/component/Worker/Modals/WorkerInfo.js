import React, { Fragment, useState  } from 'react'
import { Button, Col, Modal, Row } from 'react-bootstrap'
import { GetWorkerApi } from '../../../utils/ApiFunctions'
import { LinkButton } from '../../Controls/Buttons/Buttons'
import moment from "moment";

const WorkerInfo = (props) => {
    const [workerDetails, setWorkerDetails] = useState({})
    const [showWorkerDetails, setShowWorkerDetails] = useState(false)
    const handleOpenWorkerModal = () => {
        GetWorkerApi({workerCode: props.workerCode})
        .then((response) => {
            let details = JSON.parse(response.Message)
            setWorkerDetails(details)
            setShowWorkerDetails(true)
        }).catch(() => {
        })
    }
    const closeWorkerDetailsModal = () => {
        setShowWorkerDetails(false)
    }
    
    return (
       <Fragment>
            {
                <LinkButton onClickEvent={handleOpenWorkerModal} text={props.workerCode} className="p-0"/>
            }
             <Modal show={showWorkerDetails} onHide={closeWorkerDetailsModal} style={{width:"70% !important"}}>
                <Modal.Header closeButton>
                    <Modal.Title as="h5" className='text-capitalize'>Worker Details</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Row>
                        <Col sm={2}>
                            <h6>
                                <small className="text-muted">Name</small>
                            </h6>
                        </Col>
                        <Col sm={4}>
                            <small className="text-muted">{workerDetails.Name}</small>
                        </Col>
                        <Col sm={2}>
                            <h6>
                                <small className="text-muted">Age</small>
                            </h6>
                        </Col>
                        <Col sm={4}>
                            <small className="text-muted">
                                { `${moment().diff(moment(workerDetails.DOB, 'YYYY-MM-DD'), 'years')} years` }
                            </small>
                        </Col>
                    </Row>
                    <Row className="mt-2">
                        <Col sm={2}>
                            <h6>
                                <small className="text-muted">Contact Number</small>
                            </h6>
                        </Col>
                        <Col sm={4}>
                            <small className="text-muted">{workerDetails.ContactNo}</small>
                        </Col>
                        <Col sm={2}>
                            <h6>
                                <small className="text-muted">Aadhaar Number</small>
                            </h6>
                        </Col>
                        <Col sm={4}>
                            <small className="text-muted">
                                { workerDetails.AdharNo ?? '' }
                            </small>
                        </Col>
                    </Row>
                    <Row className="mt-2">
                        <Col sm={2}>
                            <h6>
                                <small className="text-muted">Passport Number</small>
                            </h6>
                        </Col>
                        <Col sm={4}>
                            <small className="text-muted">{workerDetails.PassportNo ?? ''}</small>
                        </Col>
                        <Col sm={2}>
                            <h6>
                                <small className="text-muted">Passport Valid Till</small>
                            </h6>
                        </Col>
                        <Col sm={4}>
                            <small className="text-muted">
                                { workerDetails.PassportExpy ?? '' }
                            </small>
                        </Col>
                    </Row>
                    <Row className="mt-2">
                        <Col sm={2}>
                            <h6>
                                <small className="text-muted">Indian Experience</small>
                            </h6>
                        </Col>
                        <Col sm={4}>
                            <small className="text-muted">{`${workerDetails.IndiaExpr} years`}</small>
                        </Col>
                        <Col sm={2}>
                            <h6>
                                <small className="text-muted">Abroad Experience</small>
                            </h6>
                        </Col>
                        <Col sm={4}>
                            <small className="text-muted">{`${workerDetails.GulfExpr} years`}</small>
                        </Col>
                    </Row>
                    <Row className="mt-2">
                        <Col sm={2}>
                            <h6>
                                <small className="text-muted">Total Experience</small>
                            </h6>
                        </Col>
                        <Col sm={4}>
                            <small className="text-muted">
                                { `${workerDetails.TotalExpr} years` }
                            </small>
                        </Col>
                        <Col sm={2}>
                            <h6>
                                <small className="text-muted">Profession</small>
                            </h6>
                        </Col>
                        <Col sm={4}>
                            <small className="text-muted">{`${workerDetails.Trade1 ?? ''}, ${workerDetails.Trade2 ?? ''}`}</small>
                        </Col>
                    </Row>
                    <Row className="mt-2">
                        <Col sm={2}>
                            <h6>
                                <small className="text-muted">PCC Date</small>
                            </h6>
                        </Col>
                        <Col sm={4}>
                            <small className="text-muted">
                                { ('Progress' in workerDetails) ? workerDetails.Progress.PCCDate == '0001-01-01T00:00:00Z' ? 'N/A' : workerDetails?.Progress.PCCDate : 'N/A'}
                            </small>
                        </Col>
                        <Col sm={2}>
                            <h6>
                                <small className="text-muted">PCC Status</small>
                            </h6>
                        </Col>
                        <Col sm={4}>
                            <small className="text-muted">{ ('Progress' in workerDetails) ? workerDetails.Progress.PCCStatus ?? 'N/A' : 'N/A' }</small>
                        </Col>
                    </Row>
                    <Row className="mt-2">
                        <Col sm={12}>
                            <h6>
                                <small className="text-muted">Video Links</small>
                            </h6>
                        </Col>
                    </Row>
                    <Row>
                        <Col sm={12}>
                            <ul>
                                {
                                    workerDetails.VidLink1 != null &&
                                    <li>
                                        <small><a href={workerDetails.VidLink1} target="_blank" className="link-primary">{workerDetails.VidLink1}</a></small>
                                    </li>
                                }
                                {
                                    workerDetails.VidLink2 != null &&
                                    <li>
                                        <small><a href={workerDetails.VidLink2} target="_blank" className="link-primary">{workerDetails.VidLink2}</a></small>
                                    </li>
                                }
                                {
                                    workerDetails.VidLink3 != null &&
                                    <li>
                                        <small><a href={workerDetails.VidLink3} target="_blank" className="link-primary">{workerDetails.VidLink3}</a></small>
                                    </li>
                                }
                            </ul>
                        </Col>
                    </Row>
                    <Row className="mt-2">
                        <Col sm={12}>
                            <h6>
                                <small className="text-muted">CV Link</small>
                            </h6>
                        </Col>
                    </Row>
                    <Row>
                        <Col sm={12}>
                            <ul>
                                {
                                    workerDetails.CVLink != null &&
                                    <li>
                                        <small><a href={workerDetails.CVLink} target="_blank" className="link-primary">{workerDetails.CVLink}</a></small>
                                    </li>
                                }
                            </ul>
                        </Col>
                    </Row>
                </Modal.Body>
                {/* <Modal.Footer>
                    <Button variant="light" onClick={closeWorkerDetailsModal}>Close</Button>
                </Modal.Footer> */}
            </Modal>
       </Fragment>
    )
}

export default WorkerInfo