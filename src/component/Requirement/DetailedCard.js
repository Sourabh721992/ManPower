import React, { Fragment, useState, useEffect } from 'react'
import { Button, Card, Col, Modal, Row, /*Spinner,*/ Table } from 'react-bootstrap'
import { IconContext } from 'react-icons'
import { BsFillPlusCircleFill } from 'react-icons/bs'
import { withRouter } from 'react-router-dom'
import { RequirementStatus, Role } from '../../master-data'
import { RequirementUpdateStatusApi } from '../../utils/ApiFunctions'
import { encodeBase64, getMoneyFormat, trimCutString , getStringTime} from '../../utils/CommonList'
import UserProfile from '../../utils/UserProfile'
import { PrimaryButton } from '../Controls/Buttons/Buttons'
import DownloadRequirement from './DownloadRequirement'
// import { AddIconBtn } from '../Controls/Buttons/IconButtons'


const DetailedCard = (props) => {

    const session = UserProfile.getSession()

    const [RequirementData, setRequirementData] = useState(props.details)
    const [ConfirmBox, setConfirmBox] = useState(false)
    const [CompleteConfirmBox, setCompleteConfirmBox] = useState(false)

    const mapStatusWithColor = { "First": "#96E2A1", "Second": "#FF9190", "Third": "#80A8FF", "Fourth": "#F7D166", "Fifth": "#C1A7FE" };

    // const [isProceedLoading, setProceedLoading] = useState(true)

    useEffect(() => {
        if(JSON.stringify(RequirementData) !== JSON.stringify(props.details)){
            setRequirementData(props.details)
        }
    }, [props.details])

    const handleMapWorkerBtn = () => {
        var Data = encodeBase64({ requirementId: RequirementData.Code });
        // redirect to worker list
        props.history.push({
            pathname: '/mapWorker/'+ Data,
        });
    }

    const handleProceedAheadConfirm = () => {
        setConfirmBox(true)
    }

    const closeConfirmModal = () => {
        setConfirmBox(false)
        setCompleteConfirmBox(false)
    }

    const handleProceedAheadBtn = () => {
        var Body = {
            requirementCode: RequirementData.Code,
            status: RequirementStatus.PROCESSING
        }

        // setProceedLoading(true)
        RequirementUpdateStatusApi(Body)
        .then(()=>{
            // setProceedLoading(false)
            let requirementDataCopy = Object.assign({}, RequirementData);
                requirementDataCopy.Status = RequirementStatus.PROCESSING
            
            setRequirementData(requirementDataCopy)
            setConfirmBox(false)
            // UPDATE TO PARENT
            if (props.updateParent) {
                props.updateParent("update-requirement-details", requirementDataCopy)
            }
        })
        .catch(() => {
            // setProceedLoading(false)
            setConfirmBox(false)
        })
    }

    const handleCompleteConfirm = () => {
        setCompleteConfirmBox(true)
    }

    const handleCompleteBtn = () => {
        var Body = {
            requirementCode: RequirementData.Code,
            status: RequirementStatus.COMPLETED
        }

        // setProceedLoading(true)
        RequirementUpdateStatusApi(Body)
            .then(() => {
                // setProceedLoading(false)
                let requirementDataCopy = Object.assign({}, RequirementData);
                requirementDataCopy.Status = RequirementStatus.COMPLETED

                setRequirementData(requirementDataCopy)
                setCompleteConfirmBox(false)
                // UPDATE TO PARENT
                if (props.updateParent) {
                    props.updateParent("update-requirement-details", requirementDataCopy)
                }
            })
            .catch(() => {
                // setProceedLoading(false)
                setCompleteConfirmBox(false)
            })
    }

    function RequirementDetailsCard(text, bg_colour, label, title) {

        return (
            <Card className="overflow-hidden StatusCounterCard">
                <Card.Body className='d-flex justify-content-center align-items-center'>
                    <h5 title={title} className="f-w-400 text-capitalize">{text}</h5>
                </Card.Body>
                <Card.Footer style={{ backgroundColor: bg_colour}}>
                    <div className='d-flex justify-content-center align-items-center'>
                        <label className='f-w-600 f-18' style={{color:"white"}}>{label}</label>
                    </div>
                </Card.Footer>
            </Card>
        )
    }

    if(RequirementData){
        return (
            <Fragment>

                <Row className='d-flex justify-content-center'>
                    <Col sm={2}>
                        {RequirementDetailsCard(trimCutString(RequirementData.ClientName,14),
                            mapStatusWithColor["First"],
                            "Client", RequirementData.ClientName)}
                    </Col>
                    <Col sm={2}>
                        {RequirementDetailsCard(trimCutString(session.Role === Role.Supplier ? RequirementData.BuyerName : RequirementData.Supplier,14),
                            mapStatusWithColor["Second"],
                            session.Role === Role.Supplier ? "Buyer" : "Supplier", 
                            session.Role === Role.Supplier ? RequirementData.BuyerName : RequirementData.Supplier)}
                    </Col>
                    <Col sm={2}>
                        {RequirementDetailsCard(RequirementData.Status,
                            mapStatusWithColor["Third"],
                            "Status")}
                    </Col>
                    {/* {
                        session.Role === Role.Buyer && */}
                        <Col sm={2}>
                            {RequirementDetailsCard(RequirementData.Rating,
                                mapStatusWithColor["Fourth"],
                                "Rating")}
                        </Col>
                    {/* } */}
                    
                </Row>
                {
                    RequirementData.Workers && RequirementData.Workers.length > 0 
                    && (RequirementData.Status === RequirementStatus.PENDING || RequirementData.Status === RequirementStatus.PROCESSING)  ?
                    
                        <Row>
                            <Col className='d-flex justify-content-end'>
                                {
                                    RequirementData.Status === RequirementStatus.PENDING ?
                                        <PrimaryButton text={"Proceed Ahead"} onClickEvent={handleProceedAheadConfirm} />
                                    :
                                    RequirementData.Status === RequirementStatus.PROCESSING && session.Role === Role.Buyer ?
                                        <PrimaryButton text={"Complete Requirement"} onClickEvent={handleCompleteConfirm} />
                                        : null
                                }
                            </Col>
                        </Row>
                        : null
                }
                {/* download requirement in excel */}
                {
                    RequirementData.Status === RequirementStatus.COMPLETED ?
                        <Row>
                            <Col className='d-flex justify-content-end'>
                                <DownloadRequirement requirementId={RequirementData.Code} />
                            </Col>
                        </Row>
                        : null
                }

                <Card className='shadow-sm mt-4'>
                    <Card.Header className='d-flex align-items-center justify-content-between'>
                        <h5 className='font-weight-bolder text-muted'>
                            Worker Information for Requirement - {RequirementData.Code}
                        </h5>
                        {/* Map Worker Button */}
                        {
                            session.Role === Role.Supplier && RequirementData.Status === RequirementStatus.PENDING ?
                                // <AddIconBtn btnText={"Map Workers"} onClickEvent={handleMapWorkerBtn} />
                                <div className="fl" style={{ cursor: "pointer" }} onClick={handleMapWorkerBtn}>
                                    <div className="fl" style={{ width: "25px", marginTop: "8px" }}>
                                        <IconContext.Provider value={{ color: "#3860C7", size: "1.4em" }} >
                                            <div>
                                                <BsFillPlusCircleFill />
                                            </div>
                                        </IconContext.Provider>
                                    </div>
                                    <button className="btn addbtn" style={{backgroundColor: "transparent"}}>
                                        Map Workers
                                    </button>
                                </div>
                            : null
                        }
                    </Card.Header>
                    <Card.Body>
                        {/* multiple trade info */}
                        {
                            RequirementData.Trades && RequirementData.Trades.length > 0 ?
                                <Row>
                                    <Col>
                                        <Table responsive striped borderless>
                                            <thead className="text-center">
                                                <tr>
                                                    <th>Code</th>
                                                    <th>Trade</th>
                                                    <th>Salary</th>
                                                    <th>No. Of Workers</th>
                                                    <th>Timing</th>
                                                    <th>Working Days</th>
                                                    <th>Food Expense</th>
                                                    <th>Accommodation & Transport</th>
                                                </tr>
                                            </thead>
                                            <tbody className="text-center">
                                                {
                                                    RequirementData.Trades.map((item, index) => {
                                                        return (
                                                            <tr style={{ borderRadius: "5px" }} key={RequirementData.Code + "_" + index}>
                                                                <td>{
                                                                    RequirementData.Code ? RequirementData.Code : "-"
                                                                }</td>
                                                                <td>{item.TradeName}</td>
                                                                <td>{
                                                                        item.Currency && item.MinSalary && item.MinSalary > 0 && item.MaxSalary && item.MaxSalary > 0 ?
                                                                            <span>
                                                                                {getMoneyFormat(item.MinSalary, item.Currency)} - {getMoneyFormat(item.MaxSalary, item.Currency)}
                                                                            </span>
                                                                            : <span>Not Disclosed</span>
                                                                    }</td>
                                                                <td>{
                                                                    item.WorkerCount
                                                                }</td>
                                                                <td>{
                                                                    getStringTime(item.FromWH) + "-" + getStringTime(item.ToWh)
                                                                }</td>
                                                                <td>{item.WorkingDays}</td>
                                                                <td>{item.IfFoodProvided ? "Yes" : "No"}</td>
                                                                <td>{item.IfAccProvided ? "Yes" : "No"}</td>
                                                            </tr>
                                                        )
                                                    })}
                                            </tbody>
                                        </Table>
                                    </Col>
                                </Row>
                                : null
                        }

                    </Card.Body>
                </Card>

                {/* proceed ahead confirm box */}
                <Modal show={ConfirmBox} onHide={closeConfirmModal}>
                    <Modal.Header>
                        <Modal.Title as="h5">Confirm Proceed Ahead </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <p>Are you sure you want proceed ahead?<br/>Delete and map worker actions will be freezed.</p>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="light" onClick={closeConfirmModal}>No</Button>
                        <Button variant="primary" onClick={handleProceedAheadBtn}>Yes</Button>
                    </Modal.Footer>
                </Modal>

                {/* COMPLETE confirm box */}
                <Modal show={CompleteConfirmBox} onHide={closeConfirmModal}>
                    <Modal.Header>
                        <Modal.Title as="h5">Confirm Complete Requirement </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <p>Are you sure you want complete this requirement?</p>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="light" onClick={closeConfirmModal}>No</Button>
                        <Button variant="primary" onClick={handleCompleteBtn}>Yes</Button>
                    </Modal.Footer>
                </Modal>
            </Fragment>
        )
    }

    return null
} 

export default withRouter(DetailedCard)