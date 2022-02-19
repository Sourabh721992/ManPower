import React, { Fragment } from 'react'
import { Card, Col, Row, Table } from 'react-bootstrap'
import { withRouter } from 'react-router-dom'
import { Role } from '../../master-data'
import { encodeBase64, getMoneyFormat, trimCutString } from '../../utils/CommonList'
import UserProfile from '../../utils/UserProfile'
import { AddIconBtn } from '../Controls/Buttons/IconButtons'

const DetailedCard = (props) => {

    const session = UserProfile.getSession()

    const RequirementData = props.details

    const mapStatusWithColor = { "First": "#96E2A1", "Second": "#FF9190", "Third": "#80A8FF", "Fourth": "#F7D166", "Fifth": "#C1A7FE" };

    const handleMapWorkerBtn = () => {
        var Data = encodeBase64({ requirementId: RequirementData.Code });
        // redirect to worker list
        props.history.push({
            pathname: '/mapWorker/'+ Data,
        });
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
                    {
                        session.Role === Role.Buyer &&
                        <Col sm={2}>
                            {RequirementDetailsCard(RequirementData.Rating,
                                mapStatusWithColor["Fourth"],
                                "Rating")}
                        </Col>
                    }
                    
                </Row>

                <Card className='shadow-sm mt-4'>
                    <Card.Header className='d-flex align-items-center justify-content-between'>
                        <h5 className='font-weight-bolder text-muted'>
                            Worker Information for Requirement - {RequirementData.Code}
                        </h5>
                        {/* Map Worker Button */}
                        {
                            session.Role === Role.Supplier ?
                        //     <button className="btn addbtn">
                        //     Map Workers
                        // </button>
                                <AddIconBtn btnText={"Map Workers"} onClickEvent={handleMapWorkerBtn} />
                                : null
                        }
                    </Card.Header>
                    <Card.Body>
                        {/* <Row>
                            <Col className='d-flex align-items-center justify-content-end'> */}
                                {/* Map Worker Button */}
                                {/* {
                                    session.Role === Role.Supplier ?
                                        <AddIconBtn btnText={"Map Workers"} onClickEvent={handleMapWorkerBtn} />
                                        : null
                                }
                            </Col>
                        </Row> */}
                        {/* <div className='border-top mt-3'></div> */}
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
                                                                    getMoneyFormat(item.MaxSalary, item.Currency)}-{getMoneyFormat(item.MinSalary, item.Currency)
                                                                    }</td>
                                                                <td>{
                                                                    item.WorkerCount
                                                                }</td>
                                                                <td>{
                                                                    item.FromWH + "-" + item.ToWh
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
            </Fragment>
        )
    }

    return null
} 

export default withRouter(DetailedCard)