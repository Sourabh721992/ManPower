import React, { Fragment, useState, useEffect } from 'react'
import { Card, Row, Col, Button } from 'react-bootstrap'
import { ValidationForm, TextInput, Radio } from 'react-bootstrap4-form-validation';
import moment from "moment";
import { usePrevious } from '../../utils/CustomHook';

const Flight = (props) => {

    const [flightDetails, setFlightInfo] = useState({
        SAReceived: false,
        SASend: false,
        WPDate: new Date(),
        FileSubOnlineDate: new Date(),
        FileSendTOSelva: false,
        FileSendPhyDt: new Date(),
        VISAStampDt: new Date(),
        ExpectedFlightDt: new Date(),
        ConfirmedFlightDt: new Date(),
        RomanionNumber: false,
        WorkerArrivedSafely: true,
        CompanyContactPerson: '',
        ProcedureStatus: ''
    })

    const prevProps = usePrevious(props.workerData);
    useEffect(() => {
        if (prevProps && prevProps !== props.workerData) {
            if(props.workerData){
                let flightDetailsCopy = Object.assign({}, flightDetails);
                let data = props.workerData

                flightDetailsCopy.SAReceived = data.SAReceived ? data.SAReceived : flightDetailsCopy.SAReceived
                flightDetailsCopy.SASend = data.SASend ? data.SASend : flightDetailsCopy.SASend
                flightDetailsCopy.WPDate = data.WPDate ? data.WPDate : flightDetailsCopy.WPDate
                flightDetailsCopy.FileSubOnlineDate = data.FileSubOnlineDate ? data.FileSubOnlineDate : flightDetailsCopy.FileSubOnlineDate
                flightDetailsCopy.FileSendTOSelva = data.FileSendTOSelva ? data.FileSendTOSelva : flightDetailsCopy.FileSendTOSelva
                flightDetailsCopy.FileSendPhyDt = data.FileSendPhyDt ? data.FileSendPhyDt :flightDetailsCopy.FileSendPhyDt
                flightDetailsCopy.VISAStampDt = data.VISAStampDt ? data.VISAStampDt : flightDetailsCopy.VISAStampDt
                flightDetailsCopy.ExpectedFlightDt = data.ExpectedFlightDt ? data.ExpectedFlightDt : flightDetailsCopy.ExpectedFlightDt
                flightDetailsCopy.ConfirmedFlightDt = data.ConfirmedFlightDt ? data.ConfirmedFlightDt : flightDetailsCopy.ConfirmedFlightDt
                flightDetailsCopy.RomanionNumber = data.RomanionNumber ? data.RomanionNumber : flightDetailsCopy.RomanionNumber
                flightDetailsCopy.WorkerArrivedSafely = data.WorkerArrivedSafely ? data.WorkerArrivedSafely : flightDetailsCopy.WorkerArrivedSafely
                flightDetailsCopy.CompanyContactPerson = data.CompanyContactPerson ? data.CompanyContactPerson : flightDetailsCopy.CompanyContactPerson
                flightDetailsCopy.ProcedureStatus = data.ProcedureStatus ? data.ProcedureStatus : flightDetailsCopy.ProcedureStatus
                
                setFlightInfo(flightDetailsCopy)
            }
        }
        
    }, [props.workerData])
    
    
    const handleOnChange = (e, data) => {

        if (e && e.target) {
            let flightDetailsCopy = Object.assign({}, flightDetails);

            const target = e.target;
            // const type = target.type
            let value = target.value;
            const name = target.name;

            if(target.type === 'radio'){
                value = value === 'true' ? true : false
            }

            flightDetailsCopy[name] = value

            setFlightInfo(flightDetailsCopy)
        }
    }

    const onNextButton = (e) => {
        e.preventDefault();
        
        // update into parent
        props.handleOnChange(flightDetails, "update-parent", "doc")
    }

    const onPrevButton = (e) => {
        // update into parent
        props.handleOnChange(flightDetails, "update-parent", "pcc")
    }

    return (
        <Fragment>
            <Card className='shadow-sm'>
                <Card.Header>
                    <h5 className='text-muted'>Flight Details</h5>
                </Card.Header>

                <Card.Body>
                    <ValidationForm onSubmit={onNextButton}>
                        <Row className='form-group'>
                            <Col>
                                <label className="col-form-label font-weight-bolder">SA Received?<span style={{ color: 'red' }}>*</span></label>
                                <Radio.RadioGroup name="SAReceived" required valueSelected={flightDetails.SAReceived.toString()}
                                    onChange={handleOnChange}>
                                    <Radio.RadioItem id="yes" label="Yes" value="true" />
                                    <Radio.RadioItem id="no" label="No" value="false" />
                                </Radio.RadioGroup>
                            </Col>
                            <Col>
                                <label className="col-form-label font-weight-bolder">SA Send?<span style={{ color: 'red' }}>*</span></label>
                                <Radio.RadioGroup name="SASend" required valueSelected={flightDetails.SASend.toString()}
                                    onChange={handleOnChange}>
                                    <Radio.RadioItem id="yes" label="Yes" value="true" />
                                    <Radio.RadioItem id="no" label="No" value="false" />
                                </Radio.RadioGroup>
                            </Col>
                        </Row>
                        <Row className='form-group'>
                            <Col>
                                <label className="col-form-label font-weight-bolder">WP Date<span style={{ color: 'red' }}>*</span></label>
                                <TextInput
                                    id="WP-input"
                                    name="WPDate"
                                    type="date"
                                    placeholder="Select WP Date"
                                    className="form-control w-100"
                                    onChange={handleOnChange}
                                    defaultValue={moment(flightDetails.WPDate).format('YYYY-MM-DD')}
                                    // max={moment(Date.now()).format("YYYY-MM-DD")}
                                    required
                                />
                            </Col>
                            <Col>
                                <label className="col-form-label font-weight-bolder">File Submitted Online Date<span style={{ color: 'red' }}>*</span></label>
                                <TextInput
                                    id="file-submitted-online-date-input"
                                    name="FileSubOnlineDate"
                                    type="date"
                                    placeholder="Select file submitted online date"
                                    className="form-control w-100"
                                    onChange={handleOnChange}
                                    defaultValue={moment(flightDetails.FileSubOnlineDate).format('YYYY-MM-DD')}
                                    // max={moment(Date.now()).format("YYYY-MM-DD")}
                                    required
                                />
                            </Col>
                        </Row>
                        <Row className="form-group">
                            <Col>
                                <label className="col-form-label font-weight-bolder">File Send To Selva<span style={{ color: 'red' }}>*</span></label>
                                <Radio.RadioGroup name="FileSendTOSelva" required valueSelected={flightDetails.FileSendTOSelva.toString()}
                                    onChange={handleOnChange}>
                                    <Radio.RadioItem id="yes" label="Yes" value="true" />
                                    <Radio.RadioItem id="no" label="No" value="false" />
                                </Radio.RadioGroup>
                            </Col>
                            <Col>
                                <label className="col-form-label font-weight-bolder">File Send Phy Date<span style={{ color: 'red' }}>*</span></label>
                                <TextInput
                                    id="FileSendPhyDt-input"
                                    name="FileSendPhyDt"
                                    type="date"
                                    placeholder="Select File Send Phy Date"
                                    className="form-control w-100"
                                    onChange={handleOnChange}
                                    defaultValue={moment(flightDetails.FileSendPhyDt).format('YYYY-MM-DD')}
                                    // max={moment(Date.now()).format("YYYY-MM-DD")}
                                    required
                                />
                            </Col>
                        </Row>
                        <Row className="form-group">
                            <Col>
                                <label className="col-form-label font-weight-bolder">Visa Stamp Date<span style={{ color: 'red' }}>*</span></label>
                                <TextInput
                                    id="VISAStampDt-input"
                                    name="VISAStampDt"
                                    type="date"
                                    placeholder="Select Visa Stamp Date"
                                    className="form-control w-100"
                                    onChange={handleOnChange}
                                    defaultValue={moment(flightDetails.VISAStampDt).format('YYYY-MM-DD')}
                                    // max={moment(Date.now()).format("YYYY-MM-DD")}
                                    required
                                />
                            </Col>
                            <Col>
                                <label className="col-form-label font-weight-bolder">Expected Flight Date<span style={{ color: 'red' }}>*</span></label>
                                <TextInput
                                    id="ExpectedFlightDt-input"
                                    name="ExpectedFlightDt"
                                    type="date"
                                    placeholder="Select Expected Flight Date"
                                    className="form-control w-100"
                                    onChange={handleOnChange}
                                    defaultValue={moment(flightDetails.ExpectedFlightDt).format('YYYY-MM-DD')}
                                    // max={moment(Date.now()).format("YYYY-MM-DD")}
                                    required
                                />
                            </Col>
                            <Col>
                                <label className="col-form-label font-weight-bolder">Confirmed Flight Date<span style={{ color: 'red' }}>*</span></label>
                                <TextInput
                                    id="ConfirmedFlightDt-input"
                                    name="ConfirmedFlightDt"
                                    type="date"
                                    placeholder="Select Confirmed Flight Date"
                                    className="form-control w-100"
                                    onChange={handleOnChange}
                                    defaultValue={moment(flightDetails.ConfirmedFlightDt).format('YYYY-MM-DD')}
                                    // max={moment(Date.now()).format("YYYY-MM-DD")}
                                    required
                                />
                            </Col>
                        </Row>
                        <Row className='form-group'>
                            <Col>
                                <label className="col-form-label font-weight-bolder">Romanian Number<span style={{ color: 'red' }}>*</span></label>
                                <Radio.RadioGroup name="RomanionNumber" required valueSelected={flightDetails.RomanionNumber.toString()}
                                    onChange={handleOnChange}>
                                    <Radio.RadioItem id="yes" label="Yes" value="true" />
                                    <Radio.RadioItem id="no" label="No" value="false" />
                                </Radio.RadioGroup>
                            </Col>
                            <Col>
                                <label className="col-form-label font-weight-bolder">WP File Submitted?<span style={{ color: 'red' }}>*</span></label>
                                <Radio.RadioGroup name="WorkerArrivedSafely" required valueSelected={flightDetails.WorkerArrivedSafely.toString()}
                                    onChange={handleOnChange}>
                                    <Radio.RadioItem id="yes" label="Yes" value="true" />
                                    <Radio.RadioItem id="no" label="No" value="false" />
                                </Radio.RadioGroup>
                            </Col>
                        </Row>
                        <Row className="form-group">
                            <Col>
                                <label className="col-form-label font-weight-bolder">Company Contact Person<span style={{ color: 'red' }}>*</span></label>
                                <TextInput
                                    id="CompanyContactPerson-input"
                                    type="text"
                                    name="CompanyContactPerson"
                                    className="form-control w-100"
                                    placeholder="Company Contact Person"
                                    onChange={handleOnChange}
                                    defaultValue={flightDetails.CompanyContactPerson}
                                    required
                                    // disabled
                                />
                            </Col>
                            <Col>
                                <label className="col-form-label font-weight-bolder">Procedure Status<span style={{ color: 'red' }}>*</span></label>
                                <TextInput
                                    id="ProcedureStatus-input"
                                    type="text"
                                    name="ProcedureStatus"
                                    className="form-control w-100"
                                    placeholder="Enter Procedure Status"
                                    onChange={handleOnChange}
                                    defaultValue={flightDetails.ProcedureStatus}
                                    required
                                    // disabled
                                />
                            </Col>
                        </Row>
                        <Row className='mt-5'>
                            <Col className='d-flex justify-content-between'>
                                <Button variant="primary" onClick={() => onPrevButton()}>Previous</Button>
                                <Button type="submit" variant="primary">Next</Button>
                            </Col>
                        </Row>
                    </ValidationForm>
                </Card.Body>
            </Card>
        </Fragment>
    )
}

export default Flight