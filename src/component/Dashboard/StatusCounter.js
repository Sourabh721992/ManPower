import React from "react";
import "../../Css/app.css";
import "react-phone-number-input/style.css";
import { Card, Col, Row } from "react-bootstrap";

export default function StatusCounter(props) {
    const mapStatusWithColor = { "Closed": "#96E2A1", "Flight": "#FF9190", "Resources": "#80A8FF", "VISA Stamp": "#F7D166", "Work Permit": "#C1A7FE" };
    // let statusArr = [];
    console.log(props)
    /* if (props.detail) {
        statusArr = Object.keys(props.detail);
    } */
    return (

        <div className='my-5 mx-3'>
            <Row>
                <Col sm={1}></Col>
                <Col sm={2}>
                    <Card className="overflow-hidden">
                        <Card.Body className='d-flex justify-content-center align-items-center'>
                            <h2 className="f-w-400">{props.detail["Resources"]}</h2>
                        </Card.Body>
                        <Card.Footer style={{ backgroundColor:mapStatusWithColor["Resources"]}}>
                            <div className='d-flex justify-content-center align-items-center'>
                                <label className='text-muted f-w-600 f-16'>Resources</label>
                            </div>
                        </Card.Footer>
                    </Card>
                </Col>
                <Col sm={2}>
                    <Card className="overflow-hidden">
                        <Card.Body className='d-flex justify-content-center align-items-center'>
                            <h2 className="f-w-400">{props.detail["Work Permit"]}</h2>
                        </Card.Body>
                        <Card.Footer style={{ backgroundColor:mapStatusWithColor["Work Permit"]}}>
                            <div className='d-flex justify-content-center align-items-center'>
                                <label className='text-muted f-w-600 f-16'>Work Permit</label>
                            </div>
                        </Card.Footer>
                    </Card>
                </Col>
                <Col sm={2}>
                    <Card className="overflow-hidden">
                        <Card.Body className='d-flex justify-content-center align-items-center'>
                            <h2 className="f-w-400">{props.detail["VISA Stamp"]}</h2>
                        </Card.Body>
                        <Card.Footer style={{ backgroundColor:mapStatusWithColor["VISA Stamp"]}}>
                            <div className='d-flex justify-content-center align-items-center'>
                                <label className='text-muted f-w-600 f-16'>VISA Stamp</label>
                            </div>
                        </Card.Footer>
                    </Card>
                </Col>
                <Col sm={2}>
                    <Card className="overflow-hidden">
                        <Card.Body className='d-flex justify-content-center align-items-center'>
                            <h2 className="f-w-400">{props.detail["Flight"]}</h2>
                        </Card.Body>
                        <Card.Footer style={{ backgroundColor:mapStatusWithColor["Flight"]}}>
                            <div className='d-flex justify-content-center align-items-center'>
                                <label className='text-muted f-w-600 f-16'>Flight</label>
                            </div>
                        </Card.Footer>
                    </Card>
                </Col>
                <Col sm={2}>
                    <Card className="overflow-hidden">
                        <Card.Body className='d-flex justify-content-center align-items-center'>
                            <h2 className="f-w-400">{props.detail["Closed"]}</h2>
                        </Card.Body>
                        <Card.Footer style={{ backgroundColor:mapStatusWithColor["Closed"]}}>
                            <div className='d-flex justify-content-center align-items-center'>
                                <label className='text-muted f-w-600 f-16'>Closed</label>
                            </div>
                        </Card.Footer>
                    </Card>
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