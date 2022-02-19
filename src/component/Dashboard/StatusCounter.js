import React from "react";
import "../../Css/app.css";
import "react-phone-number-input/style.css";
import { Card, Col, Row } from "react-bootstrap";

export default function StatusCounter(props) {
    const mapStatusWithColor = { "Closed": "#96E2A1", "Flight": "#FF9190", "Resources": "#80A8FF", "VISA Stamp": "#F7D166", "Work Permit": "#C1A7FE" };
    // let statusArr = [];
    // // console.log(props)
    /* if (props.detail) {
        statusArr = Object.keys(props.detail);
    } */

    function statusCounterCard(count, bg_colour, label) {

        return (
            <Card className="overflow-hidden StatusCounterCard">
                <Card.Body className='d-flex justify-content-center align-items-center'>
                    <h2 className="f-w-400">{count}</h2>
                </Card.Body>
                <Card.Footer style={{ backgroundColor: bg_colour}}>
                    <div className='d-flex justify-content-center align-items-center'>
                        <label className='f-w-600 f-18' style={{color:"white"}}>{label}</label>
                    </div>
                </Card.Footer>
            </Card>
        )
    }

    return (

        <div className='my-5 mx-3'>
            <Row>
                <Col sm={1}></Col>
                <Col sm={2}>
                    {statusCounterCard(props.detail["Resources"], mapStatusWithColor["Resources"], "Resources")}
                </Col>
                <Col sm={2}>
                    {statusCounterCard(props.detail["Work Permit"], mapStatusWithColor["Work Permit"], "Work Permit")}
                </Col>
                <Col sm={2}>
                    {statusCounterCard(props.detail["VISA Stamp"], mapStatusWithColor["VISA Stamp"], "VISA Stamp")}
                </Col>
                <Col sm={2}>
                    {statusCounterCard(props.detail["Flight"], mapStatusWithColor["Flight"], "Flight")}
                </Col>
                <Col sm={2}>
                    {statusCounterCard(props.detail["Closed"], mapStatusWithColor["Closed"], "Closed")}
                </Col>
                <Col sm={1}></Col>
            </Row>
        </div>

        /* <div id="statusCounterContainer" className="statusCounterContainer">
            {
                statusArr.map((status, index) => (
                    <div key={"Status " + index} className="StatusCounterCard">
                        <div className="StatusCounterCount">
                            {props.detail[status]}
                        </div>
                        <div className="clr"></div>
                        <div className="StatusCounterLabel" style={{ backgroundColor: mapStatusWithColor[status] }}>{status}</div>
                    </div>
                ))
            }
        </div> */
    )
}