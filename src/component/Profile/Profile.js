import React, { useState, useEffect } from "react";
import "../../Css/app.css";
import Header from "../Layout/Header";
import { GetUserProfileApi, UpdateUserProfileApi } from "../../utils/ApiFunctions";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import { Row, Col, Form, InputGroup } from "react-bootstrap";
import UserProfile from "../../utils/UserProfile";
import Label from "../Controls/Label/Label";
import Text from "../Controls/Text/Text";
import SuccessAlert from "../Controls/alert/successAlert";

export default function Profile(props) {
    const [UserProfileAPIData, SetUserProfile] = useState({ UserInfo: {} });
    const [Mobile_number, setMobileNumber] = useState("");
    const [showAlert, SetAlert] = useState({ show: false, isDataSaved: false, message: "" });
    const [validated, setValidated] = useState({ allValidate: false, mobileValidate: null });

    var session = UserProfile.getSession();

    const onChange = (e) => {
        console.log(e.target.name + " " + e.target.value);
        UserProfileAPIData["UserInfo"][e.target.name] = e.target.value;

        let map = JSON.parse(JSON.stringify(UserProfileAPIData));

        SetUserProfile(map);
    }

    // const ResetForm = () => {
    //     SetAlert({ show: false, isDataSaved: false, message: "" });
    // }

    // component Did Mount
    useEffect(() => {
        console.log("component Did Mount called in Profile")
        getUserProfilefromAPI();
    })

    const getUserProfilefromAPI = async () => {

        // SetSupplierList({ SupplierList: [], ShouldUpdate: false });

        let item = {};
        item.UserId = session.UserId.toString()

        GetUserProfileApi(item).then
            ((resData) => {
                resData.Message = JSON.parse(resData.Message);
                console.log("API called");
                SetUserProfile(resData.Message);
                setMobileNumber(resData.Message.UserInfo.CountryCode + " " + resData.Message.UserInfo.MobileNo);
                SetAlert({ show: false, isDataSaved: false, message: "" });
            }).catch((error) => {
                alert("catch Error found in getUserProfile", JSON.stringify(error));
                SetUserProfile({});
            })
    }

    const Validate = async (e) => {
        let mobileValidationDisplay = null;
        e.preventDefault();

        //Validations
        if (UserProfileAPIData.UserInfo.Email === "" || UserProfileAPIData.UserInfo.FirstName === "" || UserProfileAPIData.UserInfo.LastName === "" || UserProfileAPIData.UserInfo.OrgName === "" || (Mobile_number === "") || (Mobile_number === undefined)) {
            console.log("login called 1");

            if (!Mobile_number) {
                mobileValidationDisplay = true;
            }
            else {
                mobileValidationDisplay = false
            }

            setValidated({ allValidate: true, mobileValidate: mobileValidationDisplay })
        } else {

            delete UserProfileAPIData.UserInfo.Id;
            UserProfileAPIData.UserInfo.MobileNo = await Mobile_number.substr(-10, 10);;
            UserProfileAPIData.UserInfo.CountryCode = await Mobile_number.slice(0, -10);

            UpdateUserProfileApi(UserProfileAPIData.UserInfo).then
                ((resData) => {
                    console.log("Supplier Inserted Successfully", resData);
                    SetAlert({ show: true, isDataSaved: true, message: resData.Message });

                    setTimeout(function () {
                        getUserProfilefromAPI();
                    }, 1000);
                }).catch((error) => {
                    //alert("catch error found Supplier in Dashboard", JSON.stringify(error));

                    setTimeout(function () {
                        SetAlert({ show: true, isDataSaved: false, message: error.Message + " Please Try Again" });
                    }, 3000);
                })
        }
    };

    return (
        <>
            <Header session={session} />
            <div className="DashboardBody">
                <h2 className="RequireDetlHead"> Account Information </h2>
                <div className="clr mt10px"></div>
                <div className="fl" style={{ marginLeft: "10%", width: "85%" }}>
                    <Form noValidate validated={validated} onSubmit={Validate}>
                        <Row className="mb-4 mt-4">
                            <Col sm={2}>
                                <Label value="Email" id="lblUserEmail" />
                                <span style={{ color: "red" }}>&nbsp;*</span>
                            </Col>
                            <Col sm={10} style={{ width: "35%" }}>
                                <Label value={UserProfileAPIData.UserInfo.Email} id="lblUserEmailValue" name="lblUserEmailValue" />
                            </Col>
                        </Row>
                        <Row className="mb-4">
                            <Col sm={2}>
                                <Label value="First Name" id="lblUserFirstName" />
                                <span style={{ color: "red" }}>&nbsp;*</span>
                            </Col>
                            <Col sm={10} style={{ width: "35%" }}>
                                <InputGroup className="txtbgColor">
                                    <Text required={true} key="txtUserFirstName" id="txtUserFirstName" name="FirstName" type="text" onChange={onChange} value={UserProfileAPIData.UserInfo.FirstName} />
                                </InputGroup>
                            </Col>
                        </Row>
                        <Row className="mb-4">
                            <Col sm={2}>
                                <Label value="Last Name" id="lblUserLastName" />
                                <span style={{ color: "red" }}>&nbsp;*</span>
                            </Col>
                            <Col sm={10} style={{ width: "35%" }}>
                                <InputGroup className="txtbgColor">
                                    <Text required={true} key="txtUserLastName" id="txtUserLastName" name="LastName" type="text" onChange={onChange} value={UserProfileAPIData.UserInfo.LastName} />
                                </InputGroup>
                            </Col>
                        </Row>
                        <Row className="mb-4">
                            <Col sm={2}>
                                <Label value="Organization Name" id="lblUserOrgName" />
                                <span style={{ color: "red" }}>&nbsp;*</span>
                            </Col>
                            <Col sm={10} style={{ width: "35%" }}>
                                <InputGroup className="txtbgColor">
                                    <Text required={true} key="txtUserOrgName" id="txtUserOrgName" name="OrgName" type="text" onChange={onChange} value={UserProfileAPIData.UserInfo.OrgName} />
                                </InputGroup>
                            </Col>
                        </Row>
                        <Row className="mb-4">
                            <Col sm={2}>
                                <Label value="Mobile No." id="lblUserMobile" />
                                <span style={{ color: "red" }}>&nbsp;*</span>
                            </Col>
                            <Col sm={10} style={{ width: "35%" }}>
                                <InputGroup className="txtbgColor">
                                    <PhoneInput
                                        aria-label="mobile number"
                                        className="form-control"
                                        placeholder="Enter phone number"
                                        value={Mobile_number}
                                        onChange={setMobileNumber}
                                        rules={{ required: true }}
                                        style={{ borderColor: validated.mobileValidate == null ? "#ced4da" : validated.mobileValidate === true ? "red" : "green" }}
                                    />
                                </InputGroup>
                            </Col>
                        </Row>
                        <Row className="mb-4">
                            <Col sm={2}>
                                <Label value="Role" id="lblUserRole" />
                                <span style={{ color: "red" }}>&nbsp;*</span>
                            </Col>
                            <Col sm={10} style={{ width: "25%" }}>
                                <Label value={UserProfileAPIData.UserInfo.Role === "B" ? "Hire Workers" : "Supply Workers"} id="lblUserRoleValue" name="lblUserRoleValue" />
                            </Col>
                        </Row>
                        <Row className="mb-4">
                            <Col sm={2}>
                                <Label value="Supplier Count" id="lblUserSupplierCnt" />
                                <span style={{ color: "red" }}>&nbsp;*</span>
                            </Col>
                            <Col sm={10} style={{ width: "25%" }}>
                                <Label value={UserProfileAPIData.EntityCount} id="lblUserSupplierCntValue" name="lblUserSupplierCntValue" />
                            </Col>
                        </Row>
                        <Row className="mb-4">
                            <Col sm={2}>
                                <Label value="Workers Hired" id="lblUserWorkers" />
                                <span style={{ color: "red" }}>&nbsp;*</span>
                            </Col>
                            <Col sm={10} style={{ width: "25%" }}>
                                <Label value={UserProfileAPIData.WorkersCount} id="lblUserWorkersValue" name="lblUserWorkersValue" />
                            </Col>
                        </Row>
                        <Row style={{ marginTop: "25px" }}>
                            <Col sm={2}>
                                <button type="submit" className="btn btn-primary float-right">Update</button>
                            </Col>
                            <Col sm={4}>
                                <SuccessAlert show={showAlert.show} message={showAlert.message} variant={showAlert.isDataSaved === true ? "success" : "danger"} />
                            </Col>
                        </Row>
                    </Form>
                </div>
            </div>
        </>
    )
}