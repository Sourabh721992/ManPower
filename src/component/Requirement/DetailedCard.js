import React from 'react'
import { Card, Col, Row, Table } from 'react-bootstrap'
import { withRouter } from 'react-router-dom'
import { formatShortDate, getMoneyFormat } from '../../utils/CommonList'
import { OutlinePrimaryButton } from '../Controls/Buttons/Buttons'

const DetailedCard = (props) => {

    const RequirementData = props.details

    const handleMapWorkerBtn = () => {
        // redirect to worker list
        props.history.push({
            pathname: '/mapWorker',
            requirementId: RequirementData.Code
        });
    }

    if(RequirementData){
        return (
            <Card>
                <Card.Header>
                    <h5 className='font-weight-bolder text-muted'>
                        Worker Information for Requirement - {RequirementData.Code}
                    </h5>
                </Card.Header>
                <Card.Body>
                    <Row>
                        <Col>
                            <p>Client Name: <span className='text-primary text-capitalize'>{RequirementData.ClientName}</span></p>
                            
                        </Col>
                        <Col>
                            <p>Status: <span className='font-weight-bolder'>{RequirementData.Status}</span></p>
                        </Col>
                        <Col>
                            <p>Rating: <span className='font-weight-bolder'>{RequirementData.Rating}</span></p>
                        </Col>
                        <Col className='d-flex align-items-center justify-content-end'>
                            {/* Map Worker Button */}
                            <OutlinePrimaryButton text={"Map Workers"} onClickEvent={handleMapWorkerBtn}/>
                        </Col>
                    </Row>
                    <div className='border-top mt-3'></div>
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
                                                <th>Accomodation & Transport</th>
                                            </tr>
                                        </thead>
                                        <tbody className="text-center">
                                            {
                                                RequirementData.Trades.map((item, index) => {
                                                    return (
                                                        <tr style={{ borderRadius: "5px" }} key={item.Code}>
                                                            <td>{
                                                                item.Code ? item.Code : "-"
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
        )
    }

    return null
} 

export default withRouter(DetailedCard)