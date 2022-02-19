import React, { Fragment } from 'react'
import { Card, Col, Row } from 'react-bootstrap'
import { MdDelete } from 'react-icons/md'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'
import { RemoveBuyer } from '../../utils/ApiFunctions'
import { formatShortDate, logger } from '../../utils/CommonList'
import UserProfile from '../../utils/UserProfile'
import { DeleteIconBtn, EditIconBtn } from '../Controls/Buttons/IconButtons'

export default function BuyerList(props) {
    logger.log(props)

    const session = UserProfile.getSession()
    const history = useHistory()

    const onDeleteBtn = (item) => {
        let data = {
            supplierId: session.UserId,
            buyerId: item.Id
        }

        RemoveBuyer(data)
        .then((resp) => {
            logger.log("deleted...")
            history.push("/buyer")
        })
    }  

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
                                                {/* <Col sm={12}>
                                                    <EditIconBtn btnText="Edit"/>
                                                </Col> */}
                                                <Col sm={12}>
                                                    <DeleteIconBtn btnText="Delete" onClickEvent={() => onDeleteBtn(item)}/>
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
