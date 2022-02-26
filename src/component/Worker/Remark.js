import React, { Fragment, useState } from 'react'
import { Button, Card, Dropdown, Form, Modal } from 'react-bootstrap'
import { BsChatSquareText } from 'react-icons/bs'
import { MdSend } from 'react-icons/md'
import { Role } from '../../master-data'
import { UpdateBuyerSupplierRemarks } from '../../utils/ApiFunctions'
import UserProfile from '../../utils/UserProfile'

const Remark = (props) => {

    const session = UserProfile.getSession()

    const workerCode = props.workerCode
    const [showModal, setShowModal] = useState(false)
    const [buyerRemark, setBuyerRemark] = useState(props.BuyerRemarks)
    const [supplierRemark, setSupplierRemark] = useState(props.SellerRemarks)
    const [tempRemark, setTempRemark] = useState("")

    const handleRemarkModal = () => {
        setShowModal(true)
    }

    const closeRemarkModal = () => {
        setShowModal(false)
        setTempRemark("")
    }

    const handleUpdateRemark = () => {
        // CALL API
        const Body = {
            workerCode: workerCode,
            role: session.Role,
            remarks: tempRemark
        }

        UpdateBuyerSupplierRemarks(Body)
        .then(() => {
            if (session.Role === Role.Buyer) {
                setBuyerRemark(tempRemark)
            }
            else {
                setSupplierRemark(tempRemark)
            }
            setTempRemark("")
        }).catch(() => {
            
        })
    }

    const handleRemarksInput = (e) => {
        const value = e.target.value
        setTempRemark(value)
    }

    const handleEnterKey = (e) => {
        if (e && e.key === 'Enter') {
            handleUpdateRemark()
        }
    }

    function RemarkPill(bg_colour, justify_content, content, user_name) {

        return (
            <li key={"buyer_remark"} className={'list-group-item border-0 px-0 py-1 d-flex ' + justify_content}>

                <div className={"rounded-top w-75 px-2 py-1 text-white " + bg_colour} style={{ borderBottomLeftRadius: '.25rem' }}>
                    <div className={"w-100 d-flex justify-content-start text-white"}>
                        <small className="f-10">{user_name}</small>
                    </div>
                    <p className="m-0" style={{ wordBreak: "break-word" }}>{content}</p>
                </div>
            </li>
        )
    }

    return (
        <Fragment>
            <Dropdown.Item eventKey="chat" onClick={handleRemarkModal}><BsChatSquareText /> Chat</Dropdown.Item>
            <Modal scrollable show={showModal} onHide={closeRemarkModal}>
                <Modal.Header closeButton>
                    <Modal.Title as="h5">Remarks</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Card.Body style={{ height: "250px", display: "contents" }}>

                        {
                            !buyerRemark && !supplierRemark ?
                                <p className="text-center w-100 text-muted">No Remarks Found!</p>
                                :
                                session.Role === Role.Buyer ?

                                    <Fragment>
                                        {
                                            supplierRemark ?
                                                RemarkPill("bg-secondary", "justify-content-start", supplierRemark, "Supplier Name")
                                                : null
                                        }

                                        {
                                            buyerRemark ?
                                                RemarkPill("bg-primary", "justify-content-end", buyerRemark, "You")
                                                : null
                                        }

                                    </Fragment>
                                    :
                                    session.Role === Role.Supplier ?
                                        <Fragment>
                                            {
                                                buyerRemark ?
                                                    RemarkPill("bg-secondary", "justify-content-start", buyerRemark, "Buyer Name")
                                                    : null
                                            }

                                            {
                                                supplierRemark ?
                                                    RemarkPill("bg-primary", "justify-content-end", supplierRemark, "You")
                                                    : null
                                            }

                                        </Fragment>
                                        : null

                        }

                    </Card.Body>
                </Modal.Body>
                <Modal.Footer className="border-0">
                    <Form.Control
                        as="input"
                        name=""
                        className="form-control flex-fill"
                        placeholder={(session.Role === Role.Supplier && supplierRemark) || (session.Role === Role.Buyer && buyerRemark)
                            ? "Update Remark" : "Enter your Remark"}
                        value={tempRemark}
                        onChange={(e) => handleRemarksInput(e)}
                        onKeyPress={(e) => handleEnterKey(e)}
                        autocomplete="false"
                    />
                    <Button className="btn-icon" variant="link" onClick={() => handleUpdateRemark()}>
                        <MdSend />
                    </Button>
                </Modal.Footer>
            </Modal>
        </Fragment>

    )
}

export default Remark