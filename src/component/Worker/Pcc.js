import React, { Fragment, useState, useEffect } from 'react'
import { Card, Row, Col, Button } from 'react-bootstrap'
import { ValidationForm, TextInput, Radio } from 'react-bootstrap4-form-validation';
import moment from "moment";
import { usePrevious } from '../../utils/CustomHook';
import UserProfile from '../../utils/UserProfile';
import { Role } from '../../master-data';

const Pcc = (props) => {

    const session = UserProfile.getSession()
    const [pccDetails, setPCCInfo] = useState({
        PCCDate: null,
        PCCAppliedDate: null,
        PCCAppointmentDate: null,
        PCCLoginUsername: '',
        PCCLoginPassword: '',
        PCCStatus: '',
        PCCAllDocsReceived: false,
        WPFileSubmitted: false,
        WorkPermitExpectedDt: new Date(),
        AdvanceStatus: ''
    })

    const prevProps = usePrevious(props.workerData);
    useEffect(() => {
        if (prevProps && prevProps !== props.workerData) {
            if(props.workerData){
                let pccDetailsCopy = Object.assign({}, pccDetails);
                let data = props.workerData

                pccDetailsCopy.PCCDate = data.PCCDate ? data.PCCDate : pccDetailsCopy.PCCDate
                pccDetailsCopy.PCCAppliedDate = data.PCCAppliedDate ? data.PCCAppliedDate : pccDetailsCopy.PCCAppliedDate
                pccDetailsCopy.PCCAppointmentDate = data.PCCAppointmentDate ? data.PCCAppointmentDate : pccDetailsCopy.PCCAppointmentDate
                pccDetailsCopy.PCCLoginUsername = data.PCCLoginUsername ? data.PCCLoginUsername : pccDetailsCopy.PCCLoginUsername
                pccDetailsCopy.PCCLoginPassword = data.PCCLoginPassword ? data.PCCLoginPassword : pccDetailsCopy.PCCLoginPassword
                pccDetailsCopy.PCCStatus = data.PCCStatus ? data.PCCStatus : pccDetailsCopy.PCCStatus
                pccDetailsCopy.PCCAllDocsReceived = data.PCCAllDocsReceived ? data.PCCAllDocsReceived : pccDetailsCopy.PCCAllDocsReceived
                pccDetailsCopy.WPFileSubmitted = data.WPFileSubmitted ? data.WPFileSubmitted : pccDetailsCopy.WPFileSubmitted
                pccDetailsCopy.WorkPermitExpectedDt = data.WorkPermitExpectedDt ? data.WorkPermitExpectedDt : pccDetailsCopy.WorkPermitExpectedDt
                pccDetailsCopy.AdvanceStatus = data.AdvanceStatus ? data.AdvanceStatus : pccDetailsCopy.AdvanceStatus
                
                setPCCInfo(pccDetailsCopy)
            }
        }
        
    }, [props.workerData])
    
    
    const handleOnChange = (e, data) => {

        if (e && e.target) {
            let pccDetailsCopy = Object.assign({}, pccDetails);

            const target = e.target;
            // const type = target.type
            let value = target.value;
            const name = target.name;

            if(target.type === 'radio'){
                value = value === 'true' ? true : false
            }

            pccDetailsCopy[name] = value

            setPCCInfo(pccDetailsCopy)
        }
    }

    const onNextButton = (e) => {
        e.preventDefault();
        
        // update into parent
        props.handleOnChange(pccDetails, "update-progress-api")
    }

    const onPrevButton = (e) => {
        // update into parent
        props.handleOnChange(pccDetails, "update-parent", "selection")
    }

    return (
        <Fragment>
            <Card className='shadow-sm'>
                <Card.Header>
                    <h5 className='text-muted'>PCC Details</h5>
                </Card.Header>

                <Card.Body>
                    <ValidationForm onSubmit={onNextButton}>
                        <Row className='form-group'>
                            <Col>
                                <label className="col-form-label font-weight-bolder">Police Clearance Certificate Date</label>
                                <TextInput
                                    id="PCCDate-input"
                                    name="PCCDate"
                                    type="date"
                                    placeholder="Select PCC Date"
                                    className="form-control w-100"
                                    onChange={handleOnChange}
                                    value={moment(pccDetails.PCCDate).format('YYYY-MM-DD')}
                                    disabled={session.Role === Role.Buyer}
                                    // max={moment(Date.now()).format("YYYY-MM-DD")}
                                    // required
                                />
                            </Col>
                            <Col>
                                <label className="col-form-label font-weight-bolder">PCC Applied Date</label>
                                <TextInput
                                    id="Pcc-applied-date-input"
                                    name="PCCAppliedDate"
                                    type="date"
                                    placeholder="Select PCC Applied Date"
                                    className="form-control w-100"
                                    onChange={handleOnChange}
                                    value={moment(pccDetails.PCCAppliedDate).format('YYYY-MM-DD')}
                                    disabled={session.Role === Role.Buyer}
                                    // max={moment(Date.now()).format("YYYY-MM-DD")}
                                    // required
                                />
                            </Col>
                            {
                                // show to supplier not to buyer/client
                                session.Role === Role.Supplier ?
                                    <Col>
                                        <label className="col-form-label font-weight-bolder">PCC Appointment Date</label>
                                        <TextInput
                                            id="PCCAppointmentDate-input"
                                            name="PCCAppointmentDate"
                                            type="date"
                                            placeholder="Select PCC Appointment Date"
                                            className="form-control w-100"
                                            onChange={handleOnChange}
                                            value={moment(pccDetails.PCCAppointmentDate).format('YYYY-MM-DD')}
                                        // max={moment(Date.now()).format("YYYY-MM-DD")}
                                        // required
                                        />
                                    </Col>
                                    : null
                            }
                            
                        </Row>
                        {
                            // show to supplier not to buyer/client
                            session.Role === Role.Supplier ?
                                <Row className="form-group">
                                    <Col>
                                        <label className="col-form-label font-weight-bolder">PCC Login Username</label>
                                        <TextInput
                                            id="PCCLoginUsername-input"
                                            type="text"
                                            name="PCCLoginUsername"
                                            className="form-control w-100"
                                            placeholder="PCC Login Username"
                                            onChange={handleOnChange}
                                            value={pccDetails.PCCLoginUsername}
                                        // required
                                        // disabled
                                        />
                                    </Col>
                                    <Col>
                                        <label className="col-form-label font-weight-bolder">PCC Login Password</label>
                                        <TextInput
                                            id="PCCLoginPassword-input"
                                            type="text"
                                            name="PCCLoginPassword"
                                            className="form-control w-100"
                                            placeholder="PCC Login Password"
                                            onChange={handleOnChange}
                                            value={pccDetails.PCCLoginPassword}
                                        // required
                                        // disabled
                                        />
                                    </Col>
                                </Row>
                                : null
                        }
                        
                        <Row className='form-group'>
                            <Col>
                                <label className="col-form-label font-weight-bolder">PCC All Document Received?</label>
                                <Radio.RadioGroup name="PCCAllDocsReceived" valueSelected={pccDetails.PCCAllDocsReceived.toString()}
                                    onChange={handleOnChange}>
                                    <Radio.RadioItem id="yes" label="Yes" value="true" />
                                    <Radio.RadioItem id="no" label="No" value="false" />
                                </Radio.RadioGroup>
                            </Col>
                            <Col>
                                <label className="col-form-label font-weight-bolder">WP File Submitted?</label>
                                <Radio.RadioGroup name="WPFileSubmitted" valueSelected={pccDetails.WPFileSubmitted.toString()}
                                    onChange={handleOnChange}>
                                    <Radio.RadioItem id="yes" label="Yes" value="true" />
                                    <Radio.RadioItem id="no" label="No" value="false" />
                                </Radio.RadioGroup>
                            </Col>
                            <Col sm={6}>
                                <label className="col-form-label font-weight-bolder">Expected Date Of Work Permit</label>
                                <TextInput
                                    id="WorkPermitExpectedDt-input"
                                    name="WorkPermitExpectedDt"
                                    type="date"
                                    placeholder="Select PCC Appointment Date"
                                    className="form-control w-100"
                                    onChange={handleOnChange}
                                    value={moment(pccDetails.WorkPermitExpectedDt).format('YYYY-MM-DD')}
                                    // max={moment(Date.now()).format("YYYY-MM-DD")}
                                    // required
                                />
                            </Col>
                        </Row>
                        {
                            // show to supplier not to buyer/client
                            session.Role === Role.Supplier ?
                                <Row className="form-group">
                                    <Col>
                                        <label className="col-form-label font-weight-bolder">PCC Status</label>
                                        <TextInput
                                            id="PCCStatus-input"
                                            type="text"
                                            name="PCCStatus"
                                            className="form-control w-100"
                                            placeholder="Enter PCC Status"
                                            onChange={handleOnChange}
                                            value={pccDetails.PCCStatus}
                                        // required
                                        // disabled
                                        />
                                    </Col>
                                    <Col>
                                        <label className="col-form-label font-weight-bolder">PCC Advance Status</label>
                                        <TextInput
                                            id="AdvanceStatus-input"
                                            type="text"
                                            name="AdvanceStatus"
                                            className="form-control w-100"
                                            placeholder="Enter PCC Advance Status"
                                            onChange={handleOnChange}
                                            value={pccDetails.AdvanceStatus}
                                        // required
                                        // disabled
                                        />
                                    </Col>
                                </Row>
                                : null
                        }
                        
                        <Row className='mt-5'>
                            <Col className='d-flex justify-content-between'>
                                <Button variant="primary" onClick={() => onPrevButton()}>Previous</Button>
                                <Button type="submit" variant="primary">Update</Button>
                            </Col>
                        </Row>
                    </ValidationForm>
                </Card.Body>
            </Card>
        </Fragment>
    )
}

export default Pcc