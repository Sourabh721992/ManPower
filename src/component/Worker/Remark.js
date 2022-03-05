import React, { Fragment, useState } from 'react'
import { Button, Card, Form, Modal } from 'react-bootstrap'
import { MdSend } from 'react-icons/md'
import { Role } from '../../master-data'
import { UpdateBuyerSupplierRemarks } from '../../utils/ApiFunctions'
import { getItemFromLocalStorage } from '../../utils/CommonList'
import UserProfile from '../../utils/UserProfile'

const Remark = (props) => {

    const session = UserProfile.getSession()

    const workerCode = props.workerCode
    const showModal = props.show
    const requirementCode = props.requirementCode
    // const [showModal, setShowModal] = useState(false)
    const [buyerRemark, setBuyerRemark] = useState(props.BuyerRemarks)
    const [supplierRemark, setSupplierRemark] = useState(props.SellerRemarks)
    const [tempRemark, setTempRemark] = useState("")

    const closeRemarkModal = () => {
        // setShowModal(false)
        setTempRemark("")
        if(props.closeRemark){
            props.closeRemark()
        }
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
            closeRemarkModal()
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

    function RemarkPill(bg_colour, justify_content, content, name) {
        let user_name = name
        if(!name){
            var rData = getItemFromLocalStorage(requirementCode)
            if (rData) {
                if (session.Role === Role.Buyer) {
                    user_name = rData.supplierName ? rData.supplierName : ""
                }
                else {
                    user_name = rData.buyerName ? rData.buyerName : ""
                }
            }
        }

        return (
            <li key={"buyer_remark"} className={'list-group-item border-0 px-0 py-1 d-flex ' + justify_content}>

                <div className={"rounded-top w-100 px-2 py-1 text-white " + bg_colour} style={{ borderBottomLeftRadius: '.25rem' }}>
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
            <Modal key={workerCode} scrollable show={showModal} onHide={closeRemarkModal}>
                <Modal.Header>
                    <Modal.Title as="h5">Recent Remarks</Modal.Title>
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
                                                RemarkPill("bg-secondary", "justify-content-start", supplierRemark)
                                                : null
                                        }

                                        {
                                            buyerRemark ?
                                                RemarkPill("bg-primary", "justify-content-start", buyerRemark, "You")
                                                : null
                                        }

                                    </Fragment>
                                    :
                                    session.Role === Role.Supplier ?
                                        <Fragment>
                                            {
                                                buyerRemark ?
                                                    RemarkPill("bg-secondary", "justify-content-start", buyerRemark)
                                                    : null
                                            }

                                            {
                                                supplierRemark ?
                                                    RemarkPill("bg-primary", "justify-content-starts", supplierRemark, "You")
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
                            ? "Send Message" : "Send Message"}
                        value={tempRemark}
                        onChange={(e) => handleRemarksInput(e)}
                        onKeyPress={(e) => handleEnterKey(e)}
                        autocomplete="false"
                    />
                    <Button disabled={tempRemark.length === 0} className="btn-icon" variant="link" onClick={() => handleUpdateRemark()}>
                        <MdSend />
                    </Button>
                </Modal.Footer>
            </Modal>
        </Fragment>

    )
}

export default Remark