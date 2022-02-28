import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import "../../Css/app.css";
import { RequirementInsert, LoginAPI } from "../../utils/ApiFunctions";
import { Row, Col, Form} from "react-bootstrap";
import "react-phone-number-input/style.css";
import UserProfile from "../../utils/UserProfile";
import {getTrades} from "../../utils/CommonList";
import StatusCounter from "./StatusCounter"
import RequirementTable from "./RequirementTable";
import Modal from 'react-bootstrap/Modal'
import Label from "../Controls/Label/Label";
import Dropdown from "../Controls/Dropdown/Dropdown";
import Text from "../Controls/Text/Text";
import SuccessAlert from "../Controls/alert/successAlert";
import { FcDeleteRow, FcAddRow } from "react-icons/fc";
import { BsFillPlusCircleFill } from "react-icons/bs";
import { IconContext } from "react-icons";

export default function Dashboard(props) {
    let InitialTradeValue = { "trade": "-1", "workers": 1, "salaryFrom": 1, "salaryTo": 1, "workHoursFrom": "09:00", "workHoursTo": "18:00", "FoodExpense": "Provided", "AccTrans": "Provided" };
    let InitialStateValues = { "supplier": "", rating: "", client: "" };
    const [showRequirementPopup, setShowRequirement] = useState(false);
    const [supplierSelectedValue, formStateValue] = useState(InitialStateValues);
    const [TradeStateValue, SetTradeStateValue] = useState([InitialTradeValue]);
    const [validated, setValidated] = useState(false);
    const [showAlert, SetAlert] = useState({ show: false, isDataSaved: false });
    const history = useHistory();
    

    const handleClose = () => {
        setShowRequirement(false); ResetForm();
    };
    const handleShow = () => { history.push("/AddRequirement"); }
    var session = UserProfile.getSession();
    let Trades = getTrades();
    // console.log("Dashboard ", session);

    useEffect(() => {
        updateSession()
    }, [])

    const Rating = [{ id: 1, Name: 1 }, { id: 2, Name: 2 }, { id: 3, Name: 3 }, { id: 4, Name: 4 }, { id: 5, Name: 5 }]

    const onChange = (e) => {
        // // console.log(e.target.name);
        supplierSelectedValue[e.target.name] = e.target.value;

        const map = JSON.parse(JSON.stringify(supplierSelectedValue))
        // // console.log(map);
        formStateValue(map);
    }

    const deleteTradeItem = (index) => {
        if (TradeStateValue.length > 1) {
            TradeStateValue.splice(index, 1);
            let arr = JSON.parse(JSON.stringify(TradeStateValue));
            SetTradeStateValue(arr);
        }
    }

    const updateTradeItemValue = (e, index) => {
        let value = e.target.value;
        // // console.log(value)
        let key = e.target.name.split("_")[1];
        TradeStateValue[index][key] = value;
        let arr = JSON.parse(JSON.stringify(TradeStateValue));
        // // console.log(arr)
        SetTradeStateValue(arr);
    }

    const AddTradeItem = () => {
        TradeStateValue.push(InitialTradeValue);
        let arr = JSON.parse(JSON.stringify(TradeStateValue));
        SetTradeStateValue(arr);
    }

    const ResetForm = (isUpdated) => {

        if (isUpdated) {

            let item = JSON.parse(localStorage.getItem("LoginCredential"));

            LoginAPI(item, true).then
                ((resData) => {
                    console.warn("res1 : ", JSON.stringify(resData.Message));
                    UserProfile.setSession(resData.Message, true);
                    session = UserProfile.getSession()
                    SetInitialState();

                }).catch((error) => {
                    // alert("catch error found 1", error);
                })
        }
        else {
            SetInitialState();
        }
    }

    function SetInitialState() {
        setValidated(false);
        formStateValue(InitialStateValues);
        SetTradeStateValue([InitialTradeValue])
        SetAlert({ show: false, isDataSaved: false });
    }

    const Validate = async (e) => {

        e.preventDefault();

        // // console.log("login called");

        let valTrade = TradeStateValue.filter(function (item) {
            return item.trade === "";
        })

        //Validations
        if (supplierSelectedValue.supplier === "" || supplierSelectedValue.rating === "" || valTrade.length > 0) {
            // // console.log("login called 1");
            setValidated(true);
        } else {
            let map = {};
            map["UserId"] = session.UserId;
            map["SupplierId"] = supplierSelectedValue.supplier
            map["ClientName"] = supplierSelectedValue.client
            map["status"] = ""
            map["rating"] = supplierSelectedValue.rating

            let arr = [];
            TradeStateValue.forEach((item) => {
                let FromWH = parseInt(item.workHoursFrom.split(":")[0]);
                let ToWh = parseInt(item.workHoursTo.split(":")[0]);
                let IfFoodProvided = item.FoodExpense === "Provided" ? true : false
                let IfAccProvided = item.AccTrans === "Provided" ? true : false
                arr.push({ "TradeId": item.trade, "WorkerCount": item.workers, "Currency": "INR", "MinSalary": parseInt(item.salaryFrom), "MaxSalary": parseInt(item.salaryTo), "FromWH": FromWH, "ToWh": ToWh, "IfFoodProvided": IfFoodProvided, "IfAccProvided": IfAccProvided })
            })
            map["Trades"] = arr;

            // // console.log(map);
            RequirementInsert(map).then
                ((resData) => {
                    // // console.log("Requirement Inserted Successfully in Dashboard", resData);
                    SetAlert({ show: true, isDataSaved: true });

                    setTimeout(function () {
                        // // console.log("Set Timeout Called");
                        SetAlert({ show: false, isDataSaved: false });
                        ResetForm(true);
                    }, 2000);
                }).catch((error) => {
                    // alert("catch e/rror found requirement in Dashboard", JSON.stringify(error));
                    SetAlert({ show: true, isDataSaved: false });

                    setTimeout(function () {
                        // // console.log("Set Timeout Called");
                        SetAlert({ show: false, isDataSaved: false });
                    }, 2000);
                })
        }
    };

    const updateSession = () => {
        let item = JSON.parse(localStorage.getItem("LoginCredential"));

            LoginAPI(item, true).then
                ((resData) => {
                    UserProfile.setSession(resData.Message, true);
                    session = UserProfile.getSession()
                    SetInitialState();

                }).catch((error) => {
                    // alert("catch error found 1", error);
                })
    }

    return (
        <>
            {/* <Header session={session} /> */}
            <div className="DashboardBody">
                <StatusCounter detail={session.StatusCounter} />
                <div className="clr"></div>
                <div style={{ marginTop: "45px" }}>
                    <h4 className="RequireDetlHead text-muted"> Requirement Details </h4>
                    <div className="fl" style={{ marginLeft: "67%", cursor: "pointer", marginTop: "15px" }} onClick={handleShow}>
                        <div className="fl" style={{ width: "25px", marginTop: "8px" }}>
                            <IconContext.Provider value={{ color: "#3860C7", size: "1.4em" }} >
                                <div>
                                    <BsFillPlusCircleFill />
                                </div>
                            </IconContext.Provider>
                        </div>
                        <button className="btn addbtn">
                            Add New Requirement
                        </button>
                    </div>
                </div>
                <div className="clr"></div>
                <RequirementTable detail={session.Requirements} />
            </div>
            <Modal centered dialogClassName="requirement-modal" show={showRequirementPopup} onHide={handleClose}>
                <Modal.Header>
                    <Modal.Title>Create New Requirement</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form noValidate validated={validated} onSubmit={Validate}>
                        <Row>
                            <Col sm={2}>
                                <Label value="Supplier" id="AddRequirementSupplier" />
                                <span style={{ color: "red" }}>&nbsp;*</span>
                            </Col>
                            <Col sm={10} style={{ width: "25%" }}>
                                <Dropdown required={true} key="ddlSupplier" id="ddlSupplier" name="supplier" value={supplierSelectedValue.supplier} data={[{ "key": 1, "value": 1 }]} valueColumn="key" textColumn="value" addDefaultText={true} defaultText="--Select Supplier--" onChange={onChange} />
                            </Col>
                        </Row>
                        <Row style={{ marginTop: "10px" }}>
                            <Col sm={2}>
                                <Label value="Client Name" id="AddRequirementClient" />
                            </Col>
                            <Col sm={3}>
                                <Text key="txtClient" value={supplierSelectedValue.client} id="txtClient" name="client" type="text" onChange={onChange} />
                            </Col>
                            <Col sm={1}>
                            </Col>
                            <Col sm={1}>
                                <Label value="Rating" id="AddRequirementRating" />
                                <span style={{ color: "red" }}>&nbsp;*</span>
                            </Col>
                            <Col sm={4}>
                                <Dropdown required={true} key="ddlRating" id="ddlRating" name="rating" value={supplierSelectedValue.rating} data={Rating} valueColumn="id" textColumn="Name" addDefaultText={true} defaultText="--Select Rating--" onChange={onChange} />
                            </Col>
                        </Row>
                        {
                            TradeStateValue.map((item, index) => (
                                <div key={"TradeItemContainer" + index}>
                                    <Row key={"TradeItem1" + index} style={{ marginTop: "15px" }}>
                                        <Col sm={2}>
                                            <Label value={"Trade Info " + (index + 1)} id={"TradeInfoLabel" + index} />
                                        </Col>
                                        <Col sm={6}></Col>
                                        <Col sm={1} onClick={() => deleteTradeItem(index)}>
                                            <Label value="Delete" id={"DeleteInfo" + index} />
                                            <FcDeleteRow size="1.5em" />
                                        </Col>
                                    </Row>
                                    <div key={"TradeItem2" + index} style={{ marginTop: "-5px", border: "1px dotted gray", borderRadius: "5px" }}>
                                        <Row >
                                            <Col sm={12}>
                                                <Row style={{ marginTop: "5px" }}>
                                                    <Col sm={1} style={{ marginLeft: "1%" }}>
                                                        <Label value="Trade" id={"AddRequirementTrade" + index} />
                                                        <span style={{ color: "red" }}>&nbsp;*</span>
                                                    </Col>
                                                    <Col sm={4} style={{ width: "31.5%" }}>
                                                        <Dropdown required={true} key={"ddlTrade" + index} id={"ddlTrade" + index} name={"trade" + index + "_trade"} value={TradeStateValue[index]["trade"]} data={Trades} valueColumn="id" textColumn="name" addDefaultText={true} defaultText="--Select Trade--" onChange={(e) => updateTradeItemValue(e, index)} />
                                                    </Col>
                                                    <Col sm={1}>
                                                    </Col>
                                                    <Col sm={2}>
                                                        <Label value="Workers" id={"AddRequirementWorkers" + index} />
                                                        <span style={{ color: "red" }}>&nbsp;*</span>
                                                    </Col>
                                                    <Col sm={4} style={{ width: "20%" }}>
                                                        <Text required={true} key={"txtWorkers" + index} value={TradeStateValue[index]["workers"]} id={"txtWorkers" + index} name={"trade-" + index + "_workers"} type="number" onChange={(e) => updateTradeItemValue(e, index)} />
                                                    </Col>
                                                </Row>
                                            </Col>
                                        </Row>
                                        <Row >
                                            <Col sm={12}>
                                                <Row style={{ marginTop: "5px" }}>
                                                    <Col sm={1} style={{ width: "10%", marginLeft: "1%" }}>
                                                        <Label value="Salary(₹)" id={"AddRequirementSalary" + index} />
                                                        <span style={{ color: "red" }}>&nbsp;*</span>
                                                    </Col>
                                                    <Col sm={4} style={{ width: "30%" }}>
                                                        <Row>
                                                            <Col sm={5}>
                                                                <Text required={true} key={"txtFromSalary" + index} value={TradeStateValue[index]["salaryFrom"]} id={"txtFromSalary" + index} name={"trade-" + index + "_salaryFrom"} type="number" onChange={(e) => updateTradeItemValue(e, index)} />
                                                            </Col>
                                                            <Col sm={2}>
                                                                <Label value="To" id={"AddRequirementToSalary" + index} />
                                                            </Col>
                                                            <Col sm={5}>
                                                                <Text required={true} key={"txtToSalary" + index} value={TradeStateValue[index]["salaryTo"]} id={"txtToSalary" + index} name={"trade-" + index + "_salaryTo"} type="number" onChange={(e) => updateTradeItemValue(e, index)} />
                                                            </Col>
                                                        </Row>
                                                    </Col>
                                                    <Col sm={1}>
                                                    </Col>
                                                    <Col sm={2}>
                                                        <Label value="Working Hours" id={"AddRequirementWrkingHours" + index} />
                                                        <span style={{ color: "red" }}>&nbsp;*</span>
                                                    </Col>
                                                    <Col sm={4}>
                                                        <Row>
                                                            <Col sm={5}>
                                                                <Form.Control required style={{ width: "100%", height: "30px" }} key={"txtfromTime" + index} value={TradeStateValue[index]["workHoursFrom"]} id={"txtfromTime" + index} name={"trade-" + index + "_workHoursFrom"} type="time" onChange={(e) => updateTradeItemValue(e, index)} min="00:00" max={TradeStateValue[index]["workHoursTo"]} />
                                                            </Col>
                                                            <Col sm={2}>
                                                                <Label value="To" id={"AddRequirementToWorkingHours" + index} />
                                                            </Col>
                                                            <Col sm={5}>
                                                                <Form.Control required style={{ width: "100%", height: "30px" }} key={"txtToTime" + index} value={TradeStateValue[index]["workHoursTo"]} id={"txtToTime" + index} name={"trade-" + index + "_workHoursTo"} type="time" onChange={(e) => updateTradeItemValue(e, index)} max="23:59" min={TradeStateValue[index]["workHoursFrom"]} />
                                                            </Col>
                                                        </Row>
                                                    </Col>
                                                </Row>
                                            </Col>
                                        </Row>
                                        <Row >
                                            <Col sm={12}>
                                                <Row style={{ marginTop: "5px" }}>
                                                    <Col sm={2} style={{ marginLeft: "1%", width: "15%" }}>
                                                        <Label value="Food Expense" id={"AddRequirementFoodExpense" + index} />
                                                        <span style={{ color: "red" }}>&nbsp;*</span>
                                                    </Col>
                                                    <Col sm={3}>
                                                        <Form.Check
                                                            inline
                                                            label="Provided"
                                                            name={"trade-" + index + "_FoodExpense"}
                                                            type="radio"
                                                            id={"groupFooxExpenseP" + index}
                                                            value="Provided"
                                                            onChange={(e) => updateTradeItemValue(e, index)}
                                                            checked={TradeStateValue[index]["FoodExpense"] === "Provided" ? true : false}
                                                        />
                                                        <Form.Check
                                                            inline
                                                            label="Not Provided"
                                                            type="radio"
                                                            name={"trade-" + index + "_FoodExpense"}
                                                            id={"groupFooxExpenseNP" + index}
                                                            value="Not Provided"
                                                            onChange={(e) => updateTradeItemValue(e, index)}
                                                            checked={TradeStateValue[index]["FoodExpense"] === "Not Provided" ? true : false}
                                                        />
                                                    </Col>
                                                    <Col sm={1}>
                                                    </Col>
                                                    <Col sm={3}>
                                                        <Label value="Accomodation & Transport" id={"AddRequirementAccomodation" + index} />
                                                        <span style={{ color: "red" }}>&nbsp;*</span>
                                                    </Col>
                                                    <Col sm={3}>
                                                        <Form.Check
                                                            inline
                                                            label="Provided"
                                                            name={"trade-" + index + "_AccTrans"}
                                                            type="radio"
                                                            id={"groupAccTransP" + index}
                                                            value="Provided"
                                                            onChange={(e) => updateTradeItemValue(e, index)}
                                                            checked={TradeStateValue[index]["AccTrans"] === "Provided" ? true : false}
                                                        />
                                                        <Form.Check
                                                            inline
                                                            label="Not Provided"
                                                            type="radio"
                                                            name={"trade-" + index + "_AccTrans"}
                                                            id={"groupAccTransNP" + index}
                                                            value="Not Provided"
                                                            onChange={(e) => updateTradeItemValue(e, index)}
                                                            checked={TradeStateValue[index]["AccTrans"] === "Not Provided" ? true : false}
                                                        />
                                                    </Col>
                                                </Row>
                                            </Col>
                                        </Row>
                                    </div>
                                </div>
                            ))
                        }
                        <Row style={{ marginTop: "25px" }}>
                            <Col sm={2} onClick={() => AddTradeItem()} style={{ cursor: "pointer" }}>
                                <FcAddRow size="1.5em" />
                                <Label value="Add New Trade" id="AddNewTrade" style={{ float: "right", textDecoration: "underline" }} />
                            </Col>
                            <Col sm={2}>
                                <button type="submit" className="btn btn-primary float-right">Save</button>
                                <button className="btn btn-secondary float-right" variant="secondary" onClick={handleClose} style={{ marginLeft: "10px" }}>
                                    Close
                                </button>
                            </Col>
                            <Col sm={2}>
                                <SuccessAlert show={showAlert.show} message={showAlert.isDataSaved === true ? "Saved Successfully !" : "Error Occurred"} variant={showAlert.isDataSaved === true ? "success" : "danger"} />
                            </Col>
                        </Row>
                    </Form>
                </Modal.Body>
            </Modal>
        </>
    )
}