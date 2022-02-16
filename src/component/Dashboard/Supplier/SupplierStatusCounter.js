import React from 'react'
import { Card, Col, Row } from 'react-bootstrap'

export default function SupplierStatusCounter() {
    return (
        <div className='my-5 mx-3'>
            <Row>
                <Col sm={1}></Col>
                <Col sm={2}>
                    <Card className="overflow-hidden">
                        <Card.Body className='d-flex justify-content-center align-items-center'>
                            <h2 className="f-w-400">63</h2>
                            {/* <p className="text-muted f-w-600 f-16"><span className="text-c-blue">Amount</span> Processed</p> */}
                        </Card.Body>
                        <Card.Footer>
                            <div className='d-flex justify-content-center align-items-center'>
                                <label className='text-muted f-w-600 f-16'>Resources</label>
                            </div>
                        </Card.Footer>
                    </Card>
                </Col>
                <Col sm={2}>
                    <Card className="overflow-hidden">
                        <Card.Body className='d-flex justify-content-center align-items-center'>
                            <h2 className="f-w-400">212</h2>
                            {/* <p className="text-muted f-w-600 f-16"><span className="text-c-blue">Amount</span> Processed</p> */}
                        </Card.Body>
                        <Card.Footer>
                            <div className='d-flex justify-content-center align-items-center'>
                                <label className='text-muted f-w-600 f-16'>Work Permit</label>
                            </div>
                        </Card.Footer>
                    </Card>
                </Col>
                <Col sm={2}>
                    <Card className="overflow-hidden">
                        <Card.Body className='d-flex justify-content-center align-items-center'>
                            <h2 className="f-w-400">21</h2>
                            {/* <p className="text-muted f-w-600 f-16"><span className="text-c-blue">Amount</span> Processed</p> */}
                        </Card.Body>
                        <Card.Footer>
                            <div className='d-flex justify-content-center align-items-center'>
                                <label className='text-muted f-w-600 f-16'>Visa Stamp</label>
                            </div>
                        </Card.Footer>
                    </Card>
                </Col>
                <Col sm={2}>
                    <Card className="overflow-hidden">
                        <Card.Body className='d-flex justify-content-center align-items-center'>
                            <h2 className="f-w-400">109</h2>
                            {/* <p className="text-muted f-w-600 f-16"><span className="text-c-blue">Amount</span> Processed</p> */}
                        </Card.Body>
                        <Card.Footer>
                            <div className='d-flex justify-content-center align-items-center'>
                                <label className='text-muted f-w-600 f-16'>Flight</label>
                            </div>
                        </Card.Footer>
                    </Card>
                </Col>
                <Col sm={2}>
                    <Card className="overflow-hidden">
                        <Card.Body className='d-flex justify-content-center align-items-center'>
                            <h2 className="f-w-400">1752</h2>
                            {/* <p className="text-muted f-w-600 f-16"><span className="text-c-blue">Amount</span> Processed</p> */}
                        </Card.Body>
                        <Card.Footer>
                            <div className='d-flex justify-content-center align-items-center'>
                                <label className='text-muted f-w-600 f-16'>Closed</label>
                            </div>
                        </Card.Footer>
                    </Card>
                </Col>
                <Col sm={1}></Col>
            </Row>
        </div>
    )
}
