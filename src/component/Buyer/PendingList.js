import React, { Fragment } from 'react'
import { Card, Col, Row } from 'react-bootstrap'
import { formatShortDate } from '../../utils/CommonList'

export default function PendingList(props) {
    return (
        <Fragment>
            <Row>
                {props.pendingList.map((item, index) => {
                    return (
                        <Col key={"pending-buyer-user-card-" + index} sm={4}>
                                <Card className="buyer-user-card">
                                    {/* <Card.Header className='d-flex justify-content-between'>
                                        <h6>{item}</h6>
                                    </Card.Header> */}
                                    <Card.Body>
                                        <Row>
                                            <Col sm={12}>
                                                <label className='m-2'>Email:</label>
                                                <span style={{ color: "#4361A1", fontWeight:"bold" }}>{item.Email}</span>
                                            </Col>
                                            <Col sm={12}>
                                                <label className='m-2'>Created Date:</label>
                                                <span style={{ color: "#4361A1", fontWeight:"bold" }}>{formatShortDate(item.CreatedDt)}</span>
                                            </Col>
                                            <Col sm={12}>
                                                <label className='m-2'>Modify Date:</label>
                                                <span style={{ color: "#4361A1", fontWeight:"bold" }}>{formatShortDate(item.ModifyDt)}</span>
                                            </Col>
                                        </Row>
                                    </Card.Body>
                                </Card>
                             </Col> 
                    )
                })}
            </Row>
        </Fragment>
    )
}
