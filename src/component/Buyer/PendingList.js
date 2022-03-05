import React, { Fragment, /* useState, useEffect */ } from 'react'
import { Card, Col, Row } from 'react-bootstrap'
// import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'
import { DeletePendingUsersApi } from '../../utils/ApiFunctions'
import { formatShortDate } from '../../utils/CommonList'
import UserProfile from '../../utils/UserProfile'
// import SuccessAlert from '../Controls/alert/successAlert'
import { DeleteIconBtn } from '../Controls/Buttons/IconButtons'

export default function PendingList(props) {
    const session = UserProfile.getSession()
    /* const [showAlert, setShowAlert] = useState(false)
    const [alertMessage, setAlertMessage] = useState("") */
    
    let pendingList = props.pendingList

    const onDeleteBtn = (email, index) => {
        // SetSupplierList({ SupplierList: [], ShouldUpdate: false });
        let data = { 
            UserId: session.UserId.toString(),
            Email: email
        }

        DeletePendingUsersApi(data).then
            ((resData) => {
                //resData.Message = JSON.parse(resData.Message);
                // SetAlert({ show: true, isDataSaved: true, message: resData.Message });
                pendingList = pendingList.splice(index, 1)
                if(props.updateParent){
                    props.updateParent("deletePendingUser", data)
                }
                /* setAlertMessage(resData.Message)
                setShowAlert(true); */
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
                    <h5 className="RequireDetlHead">{"Pending Supplier Count : " + pendingList.length}</h5>
                </Row>
                    
                    : ""
            }
            <Row>
                {pendingList.map((item, index) => {
                    return (
                        <Col key={"pending-buyer-user-card-" + index} sm={4}>
                                <Card className="buyer-user-card">
                                    {/* <Card.Header className='d-flex justify-content-between'>
                                        <h6>{item}</h6>
                                    </Card.Header> */}
                                    <Card.Body>
                                        <Row>
                                            <Col sm={8}>
                                                <Row>
                                                    <Col sm={12}>
                                                        <label className="fs15px fl mt5px fw500">Email:&nbsp;</label>
                                                        <span className="fs15px fl mt5px fw500" style={{ color: "#4361A1" }}>{item.Email}</span>
                                                    </Col>
                                                </Row>
                                                <Row>
                                                    <Col sm={12}>
                                                        <label className="fs15px fl mt5px fw500">Created Date:&nbsp;</label>
                                                        <span className="fs15px fl mt5px fw500" style={{ color: "#4361A1" }}>{formatShortDate(item.CreatedDt)}</span>
                                                    </Col>
                                                </Row>
                                                {/* <Row>
                                                    <Col sm={12}>
                                                        <label className="fs15px fl mt5px fw500">Modify Date:&nbsp;</label>
                                                        <span className="fs15px fl mt5px fw500" style={{ color: "#4361A1" }}>{formatShortDate(item.ModifyDt)}</span>
                                                    </Col>
                                                </Row> */}
                                            </Col>
                                            <Col sm={4}>
                                                {/* <Col sm={12}>
                                                    <EditIconBtn btnText="Edit"/>
                                                </Col> */}
                                                <Col sm={12}>
                                                    <DeleteIconBtn btnText="Delete" onClickEvent={() => onDeleteBtn(item.Email, index)}/>
                                                </Col>
                                                
                                            </Col>
                                        </Row>
                                    </Card.Body>
                                </Card>
                             </Col> 
                    )
                })}
            </Row>
            {/* <Col sm={4}>
                <SuccessAlert show={showAlert} message={alertMessage} variant={showAlert === true ? "success" : "danger"} />
            </Col> */}
            
        </Fragment>
    )
}
