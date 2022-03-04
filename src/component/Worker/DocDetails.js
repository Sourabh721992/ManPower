import React, { Fragment, useState, useEffect } from 'react'
import { Card, Row, Col, Button } from 'react-bootstrap'
import { ValidationForm, TextInput } from 'react-bootstrap4-form-validation';
import { usePrevious } from '../../utils/CustomHook';

const DocDetails = (props) => {

    const [docDetails, setDocInfo] = useState({
        Insurance: '',
        ApplicationNumber: '',
        FileNumber: '',
        Password: '',
        PassportSentToCandidate: '',
        PassportStatus: ''
    })

    const prevProps = usePrevious(props.workerData);
    useEffect(() => {
        if (prevProps && prevProps !== props.workerData) {
            if(props.workerData){
                let docDetailsCopy = Object.assign({}, docDetails);
                let data = props.workerData

                docDetailsCopy.Insurance = data.Insurance ? data.Insurance : docDetailsCopy.Insurance
                docDetailsCopy.ApplicationNumber = data.ApplicationNumber ? data.ApplicationNumber : docDetailsCopy.ApplicationNumber
                docDetailsCopy.FileNumber = data.FileNumber ? data.FileNumber : docDetailsCopy.FileNumber
                docDetailsCopy.Password = data.Password ? data.Password : docDetailsCopy.Password
                docDetailsCopy.PassportSentToCandidate = data.PassportSentToCandidate ? data.PassportSentToCandidate : docDetailsCopy.PassportSentToCandidate
                docDetailsCopy.PassportStatus = data.PassportStatus ? data.PassportStatus : docDetailsCopy.PassportStatus
                
                setDocInfo(docDetailsCopy)
            }
        }
        
    }, [props.workerData, prevProps])
    
    
    const handleOnChange = (e, data) => {

        if (e && e.target) {
            let docDetailsCopy = Object.assign({}, docDetails);

            const target = e.target;
            // const type = target.type
            // const value = target.type === 'checkbox' ? target.checked : target.value;
            const name = target.name;

            docDetailsCopy[name] = target.value

            setDocInfo(docDetailsCopy)
        }
    }

    const onNextButton = (e) => {
        e.preventDefault();
        
        // update into parent
        props.handleOnChange(docDetails, "update-progress-api")
    }

    const onPrevButton = (e) => {
        // update into parent
        props.handleOnChange(docDetails, "update-parent", "flight")
    }

    return (
        <Fragment>
            <Card className='shadow-sm'>
                <Card.Header>
                    <h5 className='text-muted'>Document Details</h5>
                </Card.Header>

                <Card.Body>
                    <ValidationForm onSubmit={onNextButton}>
                        <Row className='form-group'>
                            <Col>
                                <label className="col-form-label font-weight-bolder">Insurance</label>
                                <TextInput
                                    id="Insurance-input"
                                    type="text"
                                    name="Insurance"
                                    className="form-control w-100"
                                    placeholder="Insurance"
                                    onChange={handleOnChange}
                                    value={docDetails.Insurance}
                                    // required
                                    // disabled
                                />
                            </Col>
                            <Col>
                                <label className="col-form-label font-weight-bolder">Application Number</label>
                                <TextInput
                                    id="ApplicationNumber-input"
                                    type="text"
                                    name="ApplicationNumber"
                                    className="form-control w-100"
                                    placeholder="Enter Application Number"
                                    onChange={handleOnChange}
                                    value={docDetails.ApplicationNumber}
                                    // required
                                    // disabled
                                />
                            </Col>
                        </Row>
                        <Row className="form-group">
                            <Col>
                                <label className="col-form-label font-weight-bolder">File Number</label>
                                <TextInput
                                    id="FileNumber-input"
                                    type="text"
                                    name="FileNumber"
                                    className="form-control w-100"
                                    placeholder="Enter File Number"
                                    onChange={handleOnChange}
                                    value={docDetails.FileNumber}
                                    // required
                                    // disabled
                                />
                            </Col>
                            <Col>
                                <label className="col-form-label font-weight-bolder">Password</label>
                                <TextInput
                                    id="password-input"
                                    type="text"
                                    name="Password"
                                    className="form-control w-100"
                                    placeholder="Password"
                                    onChange={handleOnChange}
                                    value={docDetails.Password}
                                    // required
                                    // disabled
                                />
                            </Col>
                        </Row>
                        <Row className="form-group">
                            <Col>
                                <label className="col-form-label font-weight-bolder">Passport Sent To Candidate</label>
                                <TextInput
                                    id="PassportSentToCandidate-input"
                                    type="text"
                                    name="PassportSentToCandidate"
                                    className="form-control w-100"
                                    placeholder="Passport Sent To Candidate"
                                    onChange={handleOnChange}
                                    value={docDetails.PassportSentToCandidate}
                                    // required
                                    // disabled
                                />
                            </Col>
                            <Col>
                                <label className="col-form-label font-weight-bolder">Passport Status</label>
                                <TextInput
                                    id="PassportStatus-input"
                                    type="text"
                                    name="PassportStatus"
                                    className="form-control w-100"
                                    placeholder="Passport Status"
                                    onChange={handleOnChange}
                                    value={docDetails.PassportStatus}
                                    // required
                                    // disabled
                                />
                            </Col>
                        </Row>
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

export default DocDetails