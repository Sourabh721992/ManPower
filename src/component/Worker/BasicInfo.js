import React, { Fragment, useState } from 'react'
import { Card, Row, Col, Button } from 'react-bootstrap'
import { ValidationForm, TextInput, Radio } from 'react-bootstrap4-form-validation';
import moment from "moment";

const BasicInfo = (props) => {

    const [basicDetails, setBasicInfo] = useState({
        name: '',
        age: 0,
        sex: 'M',
        contactNo: '',
        dob: '',
        passportNo: '',
        passportExpy: '',
        adharNo: ''
    })

    const handleOnChange = (e, data) => {

        let basicDetailsCopy = {...basicDetails}

        const target = e.target;
        const type = target.type
        // const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        basicDetailsCopy[name] = target.value

        // if(type === 'radio'){
        //     basicDetailsCopy[name] = target.value
        // }
        // else if (){

        // }

        setBasicInfo(basicDetailsCopy)

    }

    const onNextButton = (e) => {
        e.preventDefault();

        // update into parent
        props.handleOnChange(basicDetails, "contactInfo")
    }

    return (
        <Fragment>
            <Card className='shadow-sm'>
                <Card.Header>
                    <h5>Basic Details</h5>
                </Card.Header>

                <Card.Body>
                    <ValidationForm onSubmit={onNextButton}>
                        <Row className='form-group'>
                            <Col>
                                <label className="col-form-label font-weight-bolder" >Worker Name<span style={{ color: 'red' }}>*</span></label>
                                <TextInput
                                    id="workerName"
                                    type="text"
                                    name="name"
                                    placeholder="Enter Worker Full Name"
                                    onChange={handleOnChange}
                                    defaultValue={basicDetails.name}
                                    required
                                    // disabled
                                />
                            </Col>
                            <Col style={{zIndex:"9"}}>
                                <label className="col-form-label font-weight-bolder">Sex<span style={{ color: 'red' }}>*</span></label>
                                <Radio.RadioGroup name="sex" required valueSelected={basicDetails.sex}
                                    onChange={handleOnChange}>
                                    <Radio.RadioItem id="M" label="Male" value="M" />
                                    <Radio.RadioItem id="F" label="Female" value="F" />
                                    <Radio.RadioItem id="O" label="Other" value="O" />
                                </Radio.RadioGroup>
                            </Col>
                        </Row>
                        <Row className="form-group">
                            <Col>
                                <label className="col-form-label font-weight-bolder" >Date Of Birth<span style={{ color: 'red' }}>*</span></label>
                                <TextInput
                                    id="date-of-birth-input"
                                    name="dob"
                                    type="date"
                                    placeholder="Select date of birth"
                                    className="form-control"
                                    onChange={handleOnChange}
                                    defaultValue={moment(basicDetails.dob).format('YYYY-MM-DD')}
                                    max={moment(Date.now()).format("YYYY-MM-DD")}
                                    required
                                />
                            </Col>
                            <Col>
                                <label className="col-form-label font-weight-bolder" >Age<span style={{ color: 'red' }}>*</span></label>
                                <TextInput
                                    id="date-of-birth-input"
                                    name="age"
                                    type="number"
                                    placeholder="Enter age"
                                    className="form-control"
                                    onChange={handleOnChange}
                                    defaultValue={basicDetails.age}
                                    required
                                />
                            </Col>
                        </Row>
                        <Row className="form-group">
                            <Col>
                                <label className="col-form-label font-weight-bolder" >Contact No<span style={{ color: 'red' }}>*</span></label>
                                <TextInput
                                    type="text"
                                    name="contactNo"
                                    className="form-control"
                                    placeholder="Mobile Number"
                                    onChange={handleOnChange}
                                    defaultValue={basicDetails.contactNo}
                                    pattern="^((?!(0))[0-9]{10})$"
                                    required
                                    errorMessage={{
                                        required: "Mobile number is required",
                                        pattern: "Required 10 digit valid mobile number"
                                    }}
                                />
                            </Col>
                            <Col>
                                <label className="col-form-label font-weight-bolder" >Adhar No<span style={{ color: 'red' }}>*</span></label>
                                <TextInput
                                    type="text"
                                    name="adharNo"
                                    className="form-control"
                                    placeholder="Adhar Number"
                                    onChange={handleOnChange}
                                    defaultValue={basicDetails.adharNo}
                                    pattern="^\d{4}\d{4}\d{4}$"
                                    required
                                    errorMessage={{
                                        required: "Adhar number is required",
                                        pattern: "Required valid adhar number"
                                    }}
                                />
                            </Col>
                        </Row>
                        <Row className="form-group">
                            <Col>
                                <label className="col-form-label font-weight-bolder" >Passport No<span style={{ color: 'red' }}>*</span></label>
                                <TextInput
                                    type="text"
                                    name="passportNo"
                                    className="form-control"
                                    placeholder="Passport Number"
                                    onChange={handleOnChange}
                                    defaultValue={basicDetails.passportNo}
                                    //pattern="^[A-PR-WYa-pr-wy][1-9]\\d\\s?\\d{4}[1-9]$" // indian passport validation
                                    required
                                    errorMessage={{
                                        required: "Passport number is required",
                                        pattern: "Required valid passport number"
                                    }}
                                />
                            </Col>
                            <Col>
                                <label className="col-form-label font-weight-bolder" >Passport Expiry<span style={{ color: 'red' }}>*</span></label>
                                <TextInput
                                    id="date-of-birth-input"
                                    name="passportExpy"
                                    type="date"
                                    placeholder="Select passport expiry date"
                                    className="form-control"
                                    onChange={handleOnChange}
                                    defaultValue={moment(basicDetails.passportExpy).format('YYYY-MM-DD')}
                                    min={moment(Date.now()).format("YYYY-MM-DD")}
                                    required
                                />
                            </Col>
                        </Row>
                        <Row>
                            <Col className='d-flex justify-content-end'>
                                <Button type="submit" variant="primary">Next</Button>
                            </Col>
                        </Row>
                        
                    </ValidationForm>
                </Card.Body>
            </Card>
        </Fragment>
    )
}

export default BasicInfo