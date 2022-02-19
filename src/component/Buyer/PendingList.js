import React, { Fragment, useState } from 'react'
import { Card, Col, Row } from 'react-bootstrap'
// import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'
import { DeletePendingUsersApi, RemoveBuyer } from '../../utils/ApiFunctions'
import { formatShortDate, logger } from '../../utils/CommonList'
import UserProfile from '../../utils/UserProfile'
import SuccessAlert from '../Controls/alert/successAlert'
import { DeleteIconBtn } from '../Controls/Buttons/IconButtons'

export default function PendingList(props) {

    const session = UserProfile.getSession()
    const [showAlert, setShowAlert] = useState(false)
    const [alertMessage, setAlertMessage] = useState("")
    // const history = useHistory()


    const onDeleteBtn = (email) => {

        // SetSupplierList({ SupplierList: [], ShouldUpdate: false });

        let data = { 
            UserId: session.UserId.toString(),
            Email: email
        }

        DeletePendingUsersApi(data).then
            ((resData) => {
                //resData.Message = JSON.parse(resData.Message);

                // SetAlert({ show: true, isDataSaved: true, message: resData.Message });
                setAlertMessage(resData.Message)
                setShowAlert(true);
                // getPendingUser();

            }).catch((error) => {
                // console.log("catch Error found in GetSupplierApi", JSON.stringify(error));
                // SetAlert({ show: true, isDataSaved: true, message: error.Message });


            })
    }

    return (
        <Fragment>
            {
                props.from === "supplier"
                ?
                <Row>
                    <h5 className="RequireDetlHead">{"Pending Supplier Count : " + props.pendingList.length}</h5>
                </Row>
                    
                    : ""
            }
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
                                            <Col sm={8}>
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
                                            </Col>
                                            <Col sm={4}>
                                                {/* <Col sm={12}>
                                                    <EditIconBtn btnText="Edit"/>
                                                </Col> */}
                                                <Col sm={12}>
                                                    <DeleteIconBtn btnText="Delete" onClickEvent={() => onDeleteBtn(item.Email)}/>
                                                </Col>
                                                
                                            </Col>
                                        </Row>
                                    </Card.Body>
                                </Card>
                             </Col> 
                    )
                })}
            </Row>
            <Col sm={8}>
                <SuccessAlert show={showAlert} message={alertMessage} variant={showAlert === true ? "success" : "danger"} />
            </Col>
            
        </Fragment>
    )
}
