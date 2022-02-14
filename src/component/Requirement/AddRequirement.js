import React, { useState, useEffect } from "react";
import "../../Css/app.css";
import Header from "../Layout/Header";
import { RequirementInsert, LoginAPI, GetSupplierApi } from "../../utils/ApiFunctions";
import { Row, Col, Form } from "react-bootstrap";
import "react-phone-number-input/style.css";
import UserProfile from "../../utils/UserProfile";
import CommonList from "../../utils/CommonList";
import Label from "../Controls/Label/Label";
import Dropdown from "../Controls/Dropdown/Dropdown";
import Text from "../Controls/Text/Text";
import SuccessAlert from "../Controls/alert/successAlert";
import { FcDeleteRow, FcAddRow } from "react-icons/fc";
// import { IconContext } from "react-icons";
import ReactSpinner from "../Controls/Loader/ReactSpinner";
const currencies = require('currencies.json');

export default function AddRequirement() {
    let InitialTradeValue = { "TradeName": "", "workingDays": 5, "currency": "", "trade": "-1", "workers": 1, "salaryFrom": 1, "salaryTo": 1, "workHoursFrom": "09:00", "workHoursTo": "18:00", "FoodExpense": "Provided", "AccTrans": "Provided" };
    let InitialStateValues = { "supplier": "", rating: "", client: "" };
    const [supplierSelectedValue, formStateValue] = useState(InitialStateValues);
    const [TradeStateValue, SetTradeStateValue] = useState([InitialTradeValue]);
    const [validated, setValidated] = useState(false);
    const [showAlert, SetAlert] = useState({ show: false, isDataSaved: false });
    const [Currency, SetCurrencies] = useState(currencies.currencies);
    const [SupplierData, SetSupplierList] = useState([]);
    const [Spinner, SetSpinner] = useState(false);


    console.log(currencies.currencies);
    var session = UserProfile.getSession();
    let Trades = CommonList.getTrades();
    console.log("Dashboard ", session);

    useEffect(() => {
        let newCurrency = JSON.parse(JSON.stringify(Currency));
        newCurrency = newCurrency.map((item) => {
            item.name = item.name + " (" + item.symbol + ") "
            return item
        })
        console.log(newCurrency)
        SetCurrencies(newCurrency);
        getSupplier();
    });


    const Rating = [{ id: 1, Name: 1 }, { id: 2, Name: 2 }, { id: 3, Name: 3 }, { id: 4, Name: 4 }, { id: 5, Name: 5 }]

    const onChange = (e) => {
        // console.log(e.target.name);
        supplierSelectedValue[e.target.name] = e.target.value;
        const map = JSON.parse(JSON.stringify(supplierSelectedValue))
        // console.log(map);
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
        console.log(value)
        let key = e.target.name.split("_")[1];
        TradeStateValue[index][key] = value;

        if (key === "trade") {
            TradeStateValue[index]["TradeName"] = e.target.options[e.target.selectedIndex].text
        }

        let arr = JSON.parse(JSON.stringify(TradeStateValue));
        console.log(arr)
        SetTradeStateValue(arr);
    }

    const getSupplier = async () => {

        // SetSupplierList({ SupplierList: [], ShouldUpdate: false });
        let item = {};
        item.buyerId = session.UserId.toString()

        GetSupplierApi(item).then
            ((resData) => {
                resData.Message = JSON.parse(resData.Message);
                //resData.Message = "{\"Count\":2,\"Suppliers\":[{\"Id\":\"S1001\",\"Name\":\"ABC Suppliers\",\"AddedOn\":\"20-Dec,2021\",\"RequirementCleared\":5,\"TotalWorkersProvided\":239,\"LastEngagement\":\"12-Jan-2022\"},{\"Id\":\"S1002\",\"Name\":\"XYZ Suppliers\",\"AddedOn\":\"20-Dec,2021\",\"RequirementCleared\":21,\"TotalWorkersProvided\":7561,\"LastEngagement\":\"21-Jan-2022\"},{\"Id\":\"S1001\",\"Name\":\"ABC Suppliers\",\"AddedOn\":\"20-Dec,2021\",\"RequirementCleared\":5,\"TotalWorkersProvided\":239,\"LastEngagement\":\"12-Jan-2022\"},{\"Id\":\"S1002\",\"Name\":\"XYZ Suppliers\",\"AddedOn\":\"20-Dec,2021\",\"RequirementCleared\":21,\"TotalWorkersProvided\":7561,\"LastEngagement\":\"21-Jan-2022\"}]}"

                //resData.Message.Suppliers = JSON.parse(resData.Message.Suppliers);

                resData.Message.Suppliers = resData.Message.Suppliers.map((item) => {
                    item.Name = item.Name + "-" + item.Id;
                    return item;
                })

                SetSupplierList(resData.Message.Suppliers);

            }).catch((error) => {
                alert("catch Error found in GetSupplierApi", JSON.stringify(error));
                SetSupplierList([]);
            })
    }

    const AddTradeItem = () => {
        TradeStateValue.push(InitialTradeValue);
        let arr = JSON.parse(JSON.stringify(TradeStateValue));
        SetTradeStateValue(arr);
    }

    const ResetForm = (isUpdated) => {

        if (isUpdated) {

            let item = JSON.parse(localStorage.getItem("LoginCredential"));

            LoginAPI(item).then
                ((resData) => {
                    console.warn("res1 : ", JSON.stringify(resData.Message));
                    UserProfile.setSession(resData.Message, true);
                    session = UserProfile.getSession()
                    SetInitialState();

                }).catch((error) => {
                    alert("catch error found 1", error);
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

        console.log("login called");

        let valTrade = TradeStateValue.filter(function (item) {
            return item.trade === "";
        })

        //Validations
        if (supplierSelectedValue.supplier === "" || supplierSelectedValue.rating === "" || valTrade.length > 0) {
            console.log("login called 1");
            setValidated(true);
        } else {

            SetSpinner(true);

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
                arr.push({ "TradeName": item.TradeName, "TradeId": item.trade, "WorkerCount": parseInt(item.workers), "Currency": item.currency, "MinSalary": parseInt(item.salaryFrom), "MaxSalary": parseInt(item.salaryTo), "FromWH": FromWH, "ToWh": ToWh, "IfFoodProvided": IfFoodProvided, "IfAccProvided": IfAccProvided, "WorkingDays": parseInt(item.workingDays) })
            })
            map["Trades"] = arr;

            console.log("save Map", map);
            RequirementInsert(map).then
                ((resData) => {
                    console.log("Requirement Inserted Successfully in Dashboard", resData);
                    SetAlert({ show: true, isDataSaved: true });

                    SetSpinner(false);
                    setTimeout(function () {
                        console.log("Set Timeout Called");
                        SetAlert({ show: false, isDataSaved: false });
                        ResetForm(true);

                    }, 4000);
                }).catch((error) => {
                    alert("catch error found requirement in Dashboard", JSON.stringify(error));
                    SetAlert({ show: true, isDataSaved: false });
                    SetSpinner(false);

                    setTimeout(function () {
                        console.log("Set Timeout Called");
                        SetAlert({ show: false, isDataSaved: false });

                    }, 2000);
                })
        }
    };

    return (
        <>
            <Header session={session} />
            <div className="DashboardBody" style={{ marginBottom: "35px" }}>
                <div>
                    <h2 className="RequireDetlHead"> Add New Requirement </h2>
                </div>
            </div>
            <div className="clr"></div>
            <Form noValidate validated={validated} onSubmit={Validate}>
                <div style={{ float: "left", width: "90%", marginLeft: "5%" }}>
                    <Row className="mb20px">
                        <Col sm={2}>
                            <Label value="Supplier" id="AddRequirementSupplier" />
                            <span style={{ color: "red" }}>&nbsp;*</span>
                        </Col>
                        <Col sm={10} style={{ width: "25%" }}>
                            <Dropdown required={true} key="ddlSupplier" id="ddlSupplier" name="supplier" value={supplierSelectedValue.supplier} data={SupplierData} valueColumn="Id" textColumn="Name" addDefaultText={true} defaultText="--Select Supplier--" onChange={onChange} />
                        </Col>
                    </Row>
                    <Row className="mb20px">
                        <Col sm={2}>
                            <Label value="Client Name" id="AddRequirementClient" />
                        </Col>
                        <Col sm={3}>
                            <Text key="txtClient" value={supplierSelectedValue.client} id="txtClient" name="client" type="text" onChange={onChange}  />
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
                                <Row key={"TradeItem1" + index} style={{ marginTop: "15px" }} className="mb10px">
                                    <Col sm={2}>
                                        <Label value={"Trade Info " + (index + 1)} id={"TradeInfoLabel" + index} />
                                    </Col>
                                    <Col sm={9}></Col>
                                    <Col sm={1} onClick={() => deleteTradeItem(index)}>
                                        <Label value="Delete" id={"DeleteInfo" + index} />
                                        <FcDeleteRow size="1.5em" />
                                    </Col>
                                </Row>
                                <div key={"TradeItem2" + index} style={{ marginTop: "-5px", border: "1px dotted gray", borderRadius: "5px" }}>
                                    <Row className="mb10px">
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
                                                    <Label value="Working Days (Week)" id={"AddRequirementWorkingDays" + index} />
                                                    <span style={{ color: "red" }}>&nbsp;*</span>
                                                </Col>
                                                <Col sm={4}>
                                                    <Row>
                                                        <Col sm={5}>
                                                            <Text required={true} key={"txtWorkingDays" + index} value={TradeStateValue[index]["workingDays"]} id={"txtWorkingDays" + index} name={"trade-" + index + "_workingDays"} type="number" onChange={(e) => updateTradeItemValue(e, index)} />
                                                        </Col>
                                                        <Col sm={3}>
                                                            <Label value="Workers" id={"AddRequirementWorkers" + index} />
                                                            <span style={{ color: "red" }}>&nbsp;*</span>
                                                        </Col>
                                                        <Col sm={4}>
                                                            <Text required={true} key={"txtWorkers" + index} value={TradeStateValue[index]["workers"]} id={"txtWorkers" + index} name={"trade-" + index + "_workers"} type="number" onChange={(e) => updateTradeItemValue(e, index)} />
                                                        </Col>
                                                    </Row>
                                                </Col>
                                            </Row>
                                        </Col>
                                    </Row>
                                    <Row className="mb10px">
                                        <Col sm={12}>
                                            <Row style={{ marginTop: "5px" }}>
                                                <Col sm={1} style={{ marginLeft: "1%" }}>
                                                    <Label value="Salary" id={"AddRequirementSalary" + index} />
                                                    <span style={{ color: "red" }}>&nbsp;*</span>
                                                </Col>
                                                <Col sm={4} style={{ width: "31.5%" }}>
                                                    <Row>
                                                        <Col sm={5}>
                                                            <Dropdown required={true} key={"ddlCurrency" + index} id={"ddlCurrency" + index} name={"trade" + index + "_currency"} value={TradeStateValue[index]["currency"]} data={Currency} valueColumn="code" textColumn="name" addDefaultText={true} defaultText="Select Currency" onChange={(e) => updateTradeItemValue(e, index)} />
                                                        </Col>
                                                        <Col sm={3}>
                                                            <Text required={true} key={"txtFromSalary" + index} value={TradeStateValue[index]["salaryFrom"]} id={"txtFromSalary" + index} name={"trade-" + index + "_salaryFrom"} type="number" onChange={(e) => updateTradeItemValue(e, index)} />
                                                        </Col>
                                                        <Col sm={1}>
                                                            <Label value="To" id={"AddRequirementToSalary" + index} />
                                                        </Col>
                                                        <Col sm={3}>
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
                                    <Row className="mb10px">
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
                    <ReactSpinner loading={Spinner} />
                    <Row style={{ marginTop: "25px" }}>
                        <Col sm={2} onClick={() => AddTradeItem()} style={{ cursor: "pointer" }}>
                            <FcAddRow size="1.5em" />
                            <Label value="Add New Trade" id="AddNewTrade" style={{ float: "right", textDecoration: "underline" }} />
                        </Col>
                        <Col sm={2}>
                            <button type="submit" className="btn btn-primary float-right">Save</button>
                            <button className="btn btn-secondary float-right" variant="secondary" onClick={ResetForm} style={{ marginLeft: "10px" }}>
                                clear
                            </button>
                        </Col>
                        <Col sm={2}>
                            <SuccessAlert show={showAlert.show} message={showAlert.isDataSaved === true ? "Saved Successfully !" : "Error Occured"} variant={showAlert.isDataSaved === true ? "success" : "danger"} />
                        </Col>
                    </Row>
                </div>
            </Form>
        </>
    )
}