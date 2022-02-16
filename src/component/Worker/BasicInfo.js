import React, { Fragment, useState } from 'react'
import { Card, Row, Col, Button, /*Form*/ } from 'react-bootstrap'
import { ValidationForm, TextInput, Radio } from 'react-bootstrap4-form-validation';
import moment from "moment";
// import PhoneInput, { isValidPhoneNumber } from 'react-phone-number-input';

const BasicInfo = (props) => {

    const [basicDetails, setBasicInfo] = useState({
        Name: '',
        Age: 0,
        Sex: 'M',
        ContactNo: '',
        DOB: '',
        PassportNo: '',
        PassportExpy: '',
        AdharNo: ''
    })
    // const [validated, setValidated] = useState({ allValidate: false, mobileValidate: null });

    const handleOnChange = (e, data) => {

        if (e && e.target) {
            let basicDetailsCopy = { ...basicDetails }

            const target = e.target;
            // const type = target.type
            // const value = target.type === 'checkbox' ? target.checked : target.value;
            const name = target.name;

            if (name === "Age") {
                basicDetailsCopy[name] = parseInt(target.value)
            }
            else {
                basicDetailsCopy[name] = target.value
            }



            // if(type === 'radio'){
            //     basicDetailsCopy[name] = target.value
            // }
            // else if (){

            // }

            setBasicInfo(basicDetailsCopy)
        }
    }

    // const handleContactNo = (value) => {
    //     if(value){
    //         let basicDetailsCopy = { ...basicDetails }

    //         basicDetailsCopy.ContactNo = value
    //         if(isValidPhoneNumber(value) === undefined){
    //             setValidated({ allValidate: false, mobileValidate: null })
    //         }
    //         else{
    //             setValidated({ allValidate: false, mobileValidate: true })
    //         }

    //         setBasicInfo(basicDetailsCopy)
    //     }
    // }

    const onNextButton = (e) => {
        e.preventDefault();

        // update into parent
        props.handleOnChange(basicDetails, "update-parent", "contactInfo")
    }

    return (
        <Fragment>
            <Card className='shadow-sm'>
                <Card.Header>
                    <h5 className='text-muted'>Basic Details</h5>
                </Card.Header>

                <Card.Body>
                    <ValidationForm onSubmit={onNextButton}>
                        <Row className='form-group'>
                            <Col>
                                <label className="col-form-label font-weight-bolder" >Worker Name<span style={{ color: 'red' }}>*</span></label>
                                <TextInput
                                    id="workerName"
                                    type="text"
                                    name="Name"
                                    className="form-control w-100"
                                    placeholder="Enter Worker Full Name"
                                    onChange={handleOnChange}
                                    defaultValue={basicDetails.Name}
                                    required
                                    // disabled
                                />
                            </Col>
                            <Col>
                                <label className="col-form-label font-weight-bolder">Sex<span style={{ color: 'red' }}>*</span></label>
                                <Radio.RadioGroup name="Sex" required valueSelected={basicDetails.Sex}
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
                                    name="DOB"
                                    type="date"
                                    placeholder="Select date of birth"
                                    className="form-control w-100"
                                    onChange={handleOnChange}
                                    defaultValue={moment(basicDetails.DOB).format('YYYY-MM-DD')}
                                    max={moment(Date.now()).format("YYYY-MM-DD")}
                                    required
                                />
                            </Col>
                            <Col>
                                <label className="col-form-label font-weight-bolder" >Age<span style={{ color: 'red' }}>*</span></label>
                                <TextInput
                                    id="date-of-birth-input"
                                    name="Age"
                                    type="number"
                                    placeholder="Enter age"
                                    className="form-control w-100"
                                    onChange={handleOnChange}
                                    defaultValue={basicDetails.Age}
                                    required
                                />
                            </Col>
                        </Row>
                        <Row className="form-group">
                            <Col>
                                <label className="col-form-label font-weight-bolder" >Contact No<span style={{ color: 'red' }}>*</span></label>
                                {/* <PhoneInput
                                    name="ContactNo"
                                    aria-label="mobile number"
                                    className="form-control w-100"
                                    placeholder="Enter phone number"
                                    value={basicDetails.ContactNo}
                                    onChange={handleContactNo}
                                    defaultCountry={"IN"}
                                    required
                                    error={basicDetails.ContactNo ? (isValidPhoneNumber(basicDetails.ContactNo) ? undefined : 'Invalid phone number') : 'Phone number required'}
                                    // rules={{ required: true }}
                                    // style={{ borderColor: validated.mobileValidate == null ? "#ced4da" : validated.mobileValidate === true ? "red" : "green" }}
                                />
                                {
                                    validated.mobileValidate === true ? "wrong": "correct"
                                }
                                <Form.Control.Feedback id="MobileFeedback" type="invalid" style={{ display: validated.mobileValidate == null ? "none" : validated.mobileValidate === true ? "block" : "none" }}>
                                    Please Enter Mobile Number
                                </Form.Control.Feedback> */}
                                <TextInput
                                    type="text"
                                    name="ContactNo"
                                    className="form-control w-100"
                                    placeholder="Mobile Number"
                                    onChange={handleOnChange}
                                    defaultValue={basicDetails.ContactNo}
                                    pattern="^((?!(0))[0-9]{10})$"
                                    required
                                    errorMessage={{
                                        required: "Mobile number is required",
                                        pattern: "Required 10 digit valid mobile number"
                                    }}
                                />
                            </Col>
                            <Col>
                                <label className="col-form-label font-weight-bolder" >Aadhaar No<span style={{ color: 'red' }}>*</span></label>
                                <TextInput
                                    type="text"
                                    name="AdharNo"
                                    className="form-control w-100"
                                    placeholder="Aadhaar Number"
                                    onChange={handleOnChange}
                                    defaultValue={basicDetails.AdharNo}
                                    // pattern="^\d{4}\d{4}\d{4}$"
                                    required
                                    errorMessage={{
                                        required: "Aadhaar number is required",
                                        pattern: "Required valid Aadhaar number"
                                    }}
                                />
                            </Col>
                        </Row>
                        <Row className="form-group">
                            <Col>
                                <label className="col-form-label font-weight-bolder" >Passport No<span style={{ color: 'red' }}>*</span></label>
                                <TextInput
                                    type="text"
                                    name="PassportNo"
                                    className="form-control w-100"
                                    placeholder="Passport Number"
                                    onChange={handleOnChange}
                                    defaultValue={basicDetails.PassportNo}
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
                                    name="PassportExpy"
                                    type="date"
                                    placeholder="Select passport expiry date"
                                    className="form-control w-100"
                                    onChange={handleOnChange}
                                    defaultValue={moment(basicDetails.PassportExpy).format('YYYY-MM-DD')}
                                    min={moment(Date.now()).format("YYYY-MM-DD")}
                                    required
                                />
                            </Col>
                        </Row>
                        <Row className='mt-5'>
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