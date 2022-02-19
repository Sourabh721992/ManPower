import React, { Fragment } from 'react'
import { Card, Col, Row } from 'react-bootstrap'
import { MdDelete } from 'react-icons/md'
import { formatShortDate, logger } from '../../utils/CommonList'
import { DeleteIconBtn, EditIconBtn } from '../Controls/Buttons/IconButtons'

export default function BuyerList(props) {
    logger.log(props)
    return (
        <Fragment>
            <Row>
                {
                    props.buyerList.map((item) => {
                        return (
                            <Col key={"buyer-user-card-" + item.id} sm={4}>
                                <Card className="buyer-user-card">
                                    <Card.Header className='d-flex justify-content-between'>
                                        <h6>{item.Id}</h6>
                                        <span>Added On - {formatShortDate(item.AddedOn)}</span>
                                    </Card.Header>
                                    <Card.Body>
                                        <Row>
                                            <Col sm={8}>
                                                <Col sm={12}>
                                                    <label className='m-2'>Requirement Cleared:</label>
                                                    <span style={{ color: "#4361A1", fontWeight:"bold" }}>{item.RequirementCleared}</span>
                                                </Col>
                                                <Col sm={12}>
                                                    <label className='m-2'>Total Workers Provided:</label>
                                                    <span style={{ color: "#4361A1", fontWeight:"bold" }}>{item.TotalWorkersProvided}</span>
                                                </Col>
                                                <Col sm={12}>
                                                    <label className='m-2'>Last Engagement:</label>
                                                    <span style={{ color: "#4361A1", fontWeight:"bold" }}>{formatShortDate(item.LastEngagement)}</span>
                                                </Col>
                                            </Col>
                                            <Col sm={4}>
                                                <Col sm={12}>
                                                <EditIconBtn btnText="Edit"/>
                                                </Col>
                                                <Col sm={12}>
                                                <DeleteIconBtn btnText="Delete" />
                                                </Col>
                                                
                                            </Col>
                                        </Row>
                                    </Card.Body>
                                </Card>
                             </Col> 
                        )
                    })
                }
            </Row>

        </Fragment>
    )
}
