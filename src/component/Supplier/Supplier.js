import React, { useState, useEffect } from "react";
import "../../Css/app.css";
import Header from "../Layout/Header";
import { AddSupplierApi, GetSupplierApi, GetPendingUsersApi, DeletePendingUsersApi, DeleteSupplierApi } from "../../utils/ApiFunctions";
import { Row, Col, Form } from "react-bootstrap";
import "react-phone-number-input/style.css";
import UserProfile from "../../utils/UserProfile";
import Modal from 'react-bootstrap/Modal'
import Label from "../Controls/Label/Label";
import Text from "../Controls/Text/Text";
import SuccessAlert from "../Controls/alert/successAlert";
import SupplierList from "./SupplierList";
import Table from 'react-bootstrap/Table'
import { BsFillPlusCircleFill } from "react-icons/bs";
import { IconContext } from "react-icons";

export default function Supplier(props) {
    const [showRequirementPopup, setShowRequirement] = useState(false);
    const [SupplierEmail, SetSupplierEmail] = useState("");
    const [showAlert, SetAlert] = useState({ show: false, isDataSaved: false, message: "" });
    const [validated, setValidated] = useState(false);
    const [SupplierData, SetSupplierList] = useState({ SupplierList: {}, ShouldUpdate: true });
    const [PendingUserData, SetPendingUserList] = useState([]);

    var session = UserProfile.getSession();

    const handleClose = () => {
        setShowRequirement(false); ResetForm();
    };
    const handleShow = () => setShowRequirement(true);

    const onChange = (e) => {
        SetSupplierEmail(e.target.value);
    }

    const ResetForm = () => {
        SetSupplierEmail("");
        SetAlert({ show: false, isDataSaved: false, message: "" });
    }

    // component Did Mount
    useEffect(() => {
        getSupplier();
        getPendingUser();
    }, []);

    const getSupplier = async () => {

        // SetSupplierList({ SupplierList: [], ShouldUpdate: false });
        if (SupplierData.ShouldUpdate) {

            let item = {};
            item.buyerId = session.UserId.toString()

            GetSupplierApi(item).then
                ((resData) => {
                    //resData.Message = JSON.parse(resData.Message);
                    //resData.Message = "{\"Count\":2,\"Suppliers\":[{\"Id\":\"S1001\",\"Name\":\"ABC Suppliers\",\"AddedOn\":\"20-Dec,2021\",\"RequirementCleared\":5,\"TotalWorkersProvided\":239,\"LastEngagement\":\"12-Jan-2022\"},{\"Id\":\"S1002\",\"Name\":\"XYZ Suppliers\",\"AddedOn\":\"20-Dec,2021\",\"RequirementCleared\":21,\"TotalWorkersProvided\":7561,\"LastEngagement\":\"21-Jan-2022\"},{\"Id\":\"S1001\",\"Name\":\"ABC Suppliers\",\"AddedOn\":\"20-Dec,2021\",\"RequirementCleared\":5,\"TotalWorkersProvided\":239,\"LastEngagement\":\"12-Jan-2022\"},{\"Id\":\"S1002\",\"Name\":\"XYZ Suppliers\",\"AddedOn\":\"20-Dec,2021\",\"RequirementCleared\":21,\"TotalWorkersProvided\":7561,\"LastEngagement\":\"21-Jan-2022\"}]}"

                    SetSupplierList({ SupplierList: JSON.parse(resData.Message), ShouldUpdate: true });

                }).catch((error) => {
                    alert("catch Error found in GetSupplierApi", JSON.stringify(error));
                    SetSupplierList({ SupplierList: {}, ShouldUpdate: true });
                })
        }
    }


    const getPendingUser = async () => {

        // SetSupplierList({ SupplierList: [], ShouldUpdate: false });

        let item = {};
        item.UserId = session.UserId.toString()

        GetPendingUsersApi(item).then
            ((resData) => {
                resData.Message = JSON.parse(resData.Message);
                console.log("GetPendingUsersApi called");
                resData.Message.forEach(item => {
                    item.CreatedDt = item.CreatedDt.split("T")[0];
                    // console.log(item.CreatedDt);
                })

                SetPendingUserList(resData.Message);

            }).catch((error) => {
                console.log("catch Error found in GetSupplierApi", JSON.stringify(error));
                SetPendingUserList([]);
            })
    }


    const DeletePendingUser = (Email) => {

        // SetSupplierList({ SupplierList: [], ShouldUpdate: false });

        let item = {};
        item.UserId = session.UserId.toString()
        item.Email = Email

        DeletePendingUsersApi(item).then
            ((resData) => {
                //resData.Message = JSON.parse(resData.Message);

                SetAlert({ show: true, isDataSaved: true, message: resData.Message });

                setTimeout(function () {
                    SetAlert({ show: false, isDataSaved: false, message: "" });
                }, 3000);

                getPendingUser();

            }).catch((error) => {
                console.log("catch Error found in GetSupplierApi", JSON.stringify(error));
                SetAlert({ show: true, isDataSaved: true, message: error.Message });

                setTimeout(function () {
                    SetAlert({ show: false, isDataSaved: false, message: error.Message });
                }, 3000);

            })
    }

    const DeleteSelectedSupplier = (supplierId) => {

        // SetSupplierList({ SupplierList: [], ShouldUpdate: false });

        let item = {};
        item.buyerId = session.UserId.toString()
        item.supplierId = supplierId

        DeleteSupplierApi(item).then
            ((resData) => {
                //resData.Message = JSON.parse(resData.Message);

                SetAlert({ show: true, isDataSaved: true, message: resData.Message });

                setTimeout(function () {
                    SetAlert({ show: false, isDataSaved: false, message: "" });
                    getSupplier();
                }, 3000);


            }).catch((error) => {
                console.log("catch Error found in GetSupplierApi", JSON.stringify(error));
                SetAlert({ show: true, isDataSaved: true, message: error.Message });

                setTimeout(function () {
                    SetAlert({ show: false, isDataSaved: false, message: error.Message });
                }, 3000);

            })
    }

    const onClickDelete = (Email) => {
        let text = "Are you Sure ? you want to delete this item";
        if (window.confirm(text) === true) {
            DeletePendingUser(Email);
        }
    }

    const Validate = async (e) => {

        e.preventDefault();

        //Validations
        if (SupplierEmail === "") {
            console.log("login called 1");
            setValidated(true);
        } else {
            let item = {};
            item.AuthorisedById = session.UserId
            item.Email = SupplierEmail

            console.log(item);
            AddSupplierApi(item).then
                ((resData) => {
                    console.log("Supplier Inserted Successfully", resData);
                    SetAlert({ show: true, isDataSaved: true, message: resData.Message });

                    getPendingUser();
                    setTimeout(function () {
                        ResetForm();
                    }, 5000);
                }).catch((error) => {
                    //alert("catch error found Supplier in Dashboard", JSON.stringify(error));
                    SetAlert({ show: true, isDataSaved: false, message: error.Message });

                    setTimeout(function () {
                        ResetForm();
                    }, 5000);
                })
        }
    };

    return (
        <>
            <Header session={session} />
            <div className="DashboardBody">
                <Row>
                    <Col sm={3}>
                        <h3 className="RequireDetlHead"> Supplier Information </h3>
                    </Col>
                    <Col sm={3}>
                        <SuccessAlert show={showAlert.show} message={showAlert.message} variant={showAlert.isDataSaved === true ? "success" : "danger"} />
                    </Col>
                </Row>
                <div className="clr"></div>
                <h5 className="RequireDetlHead">{"Total Supplier Count : " + SupplierData.SupplierList.Count}</h5>

                <div className="fl" style={{ marginLeft: "67%", cursor: "pointer" }} onClick={handleShow}>
                    <div className="fl" style={{ width: "25px", marginTop: "8px" }}>
                        <IconContext.Provider value={{ color: "#3860C7", size: "1.4em" }} >
                            <div>
                                <BsFillPlusCircleFill />
                            </div>
                        </IconContext.Provider>
                    </div>
                    <button className="btn addbtn">
                        Add New Supplier
                    </button>
                </div>
                <div className="clr"></div>
                <SupplierList data={SupplierData.SupplierList.Suppliers ? SupplierData.SupplierList.Suppliers : []} DeleteApi={DeleteSelectedSupplier} />
            </div>
            <Modal dialogClassName="requirement-modal" show={showRequirementPopup} onHide={handleClose} centered>
                <Modal.Header>
                    <Modal.Title>Add New Supplier</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form noValidate validated={validated} onSubmit={Validate}>
                        <Row>
                            <Col sm={6}>
                                <Row>
                                    <Col sm={2}>
                                        <Label value="Email" id="AddSupplierEmail" />
                                        <span style={{ color: "red" }}>&nbsp;*</span>
                                    </Col>
                                    <Col sm={10} style={{ width: "50%" }}>
                                        <Text required key="txtSupplierEmail" id="txtSupplierEmail" name="SupplierEmail" type="text" onChange={onChange} value={SupplierEmail} />
                                    </Col>
                                </Row>
                                <Row style={{ marginTop: "25px" }}>
                                    <Col sm={5}>
                                        <button type="submit" className="btn btn-primary float-right">Save</button>
                                        <button className="btn btn-secondary float-right" variant="secondary" onClick={handleClose} style={{ marginLeft: "10px" }}>
                                            Close
                                        </button>
                                    </Col>
                                    <Col sm={4}>
                                        <SuccessAlert show={showAlert.show} message={showAlert.message} variant={showAlert.isDataSaved === true ? "success" : "danger"} />
                                    </Col>
                                </Row>
                            </Col>
                            <Col sm={6} className="RequirementTable" style={{ marginTop: "-10px" }}>
                                <h3 className="RequireDetlHead"> Pending Users </h3>
                                <div className="clr mt10px"></div>
                                <Table responsive striped bordered hover>
                                    <thead>
                                        <tr>
                                            <th>Email</th>
                                            <th>Created Date</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {PendingUserData.map((item, index) => (
                                            <tr key={"tablePendingUserRow" + index}>
                                                <td>{item.Email}</td>
                                                <td>{item.CreatedDt}</td>
                                                <td className="deletebtn" onClick={() => onClickDelete(item.Email)}>Delete</td>
                                            </tr>
                                        ))
                                        }
                                    </tbody>
                                </Table>
                            </Col>
                        </Row>
                    </Form>
                </Modal.Body>
            </Modal>
        </>
    )
}