import React, { Fragment, useState } from 'react'
import { Card, Row, Col, Button } from 'react-bootstrap'
import { ValidationForm, TextInput, Radio } from 'react-bootstrap4-form-validation';
import moment from "moment";
import PhoneInput, { isValidPhoneNumber, getCountryCallingCode } from 'react-phone-number-input';
import UserProfile from '../../utils/UserProfile';
import { Role } from '../../master-data';

const BasicInfo = (props) => {

    const session = UserProfile.getSession()

    const [basicDetails, setBasicInfo] = useState({
        Name: '',
        Age: 0,
        Sex: 'M',
        ContactNo: '',
        CountryCode: '91',
        DOB: '',
        PassportNo: '',
        PassportExpy: '',
        AdharNo: '',
        Reference: ''
    })

    // useEffect(() => {
    //   first
    
    //   return () => {
    //     second
    //   }
    // }, [])
    
    
    const [contactValidated, setContactValidated] = useState(null);

    const handleOnChange = (e, data) => {

        if (e && e.target) {
            let basicDetailsCopy = Object.assign({}, basicDetails);

            const target = e.target;
            // const type = target.type
            // const value = target.type === 'checkbox' ? target.checked : target.value;
            const name = target.name;

            if (name === "Age") {
                basicDetailsCopy[name] = parseInt(target.value)
            }
            else if(name === "AdharNo"){
                if(target.value.replace(/\s/g, '').length <= 12){
                    target.value = target.value.replace(/[^\dA-Z]/g, '').replace(/(.{4})/g, '$1 ').trim();
                    basicDetailsCopy[name] = target.value
                }
            }
            else {
                basicDetailsCopy[name] = target.value
            }

            setBasicInfo(basicDetailsCopy)
        }
    }

    const handleContactNo = (value) => {
        if(value){
            let basicDetailsCopy = Object.assign({}, basicDetails);

            basicDetailsCopy.ContactNo = value
            if(isValidPhoneNumber(value)){
                setContactValidated(true)
            }
            else{
                setContactValidated(false)
            }

            setBasicInfo(basicDetailsCopy)
        }
    }

    const handleCountryChange = (value) => {
        if(value){
            let basicDetailsCopy = Object.assign({}, basicDetails);

            basicDetailsCopy.CountryCode = getCountryCallingCode(value)

            setBasicInfo(() => basicDetailsCopy)
        }
    }

    const onNextButton = (e) => {
        e.preventDefault();
        let basicDetailsCopy = Object.assign({}, basicDetails);

        if(basicDetailsCopy.ContactNo.trim() === ""){
            setContactValidated(null)
            return
        }

        basicDetailsCopy.ContactNo = basicDetailsCopy.ContactNo.replace("+"+basicDetailsCopy.CountryCode, "")
        setBasicInfo(basicDetailsCopy)
        // update into parent
        props.handleOnChange(basicDetailsCopy, "update-parent", "contactInfo")
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
                                    disabled={session.Role === Role.Buyer}
                                    pattern="^([^0-9]*)$"
                                    errorMessage={{
                                        pattern: "Please enter valid worker name"
                                    }}
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
                                    max={moment(new Date().setFullYear(new Date().getFullYear() - 18)).format("YYYY-MM-DD")}
                                    min={moment(new Date().setFullYear(new Date().getFullYear() - 65)).format("YYYY-MM-DD")}
                                    required
                                    disabled={session.Role === Role.Buyer}
                                    
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
                                    min={18}
                                    max={65}
                                    errorMessage={{
                                        required: "Worker age is required",
                                        min: "Age can not be less than 18",
                                        max: "Age can not be more than 65"
                                    }}
                                    required
                                />
                            </Col>
                        </Row>
                        <Row className="form-group">
                            {
                                session.Role === Role.Supplier ?

                                    <Col>
                                        <label className="col-form-label font-weight-bolder" >Contact No<span style={{ color: 'red' }}>*</span></label>
                                        <PhoneInput
                                            name="ContactNo"
                                            aria-label="mobile number"
                                            className="form-control w-100"
                                            placeholder="Enter phone number"
                                            // value={basicDetails.ContactNo}
                                            onChange={handleContactNo}
                                            onCountryChange={handleCountryChange}
                                            defaultCountry={"IN"}
                                            international
                                            required
                                            countryCallingCodeEditable={false}
                                        // error={basicDetails.ContactNo ? (isValidPhoneNumber(basicDetails.ContactNo) ? undefined : 'Invalid phone number') : 'Phone number required'}
                                        // rules={{ required: true }}
                                        // style={{ borderColor: validated.mobileValidate == null ? "#ced4da" : validated.mobileValidate === true ? "red" : "green" }}
                                        />
                                        {contactValidated === false ?
                                            <small className='text-danger'>
                                                Please enter valid contact no.
                                            </small>
                                            :
                                            null
                                        }
                                    </Col>
                                    : null
                                }
                            <Col sm={6}>
                                <label className="col-form-label font-weight-bolder" >Aadhaar No</label>
                                <TextInput
                                    type="text"
                                    name="AdharNo"
                                    className="form-control w-100"
                                    placeholder="Aadhaar Number"
                                    onChange={handleOnChange}
                                    value={basicDetails.AdharNo}
                                    pattern="^\d{4}\s\d{4}\s\d{4}$"
                                    // required
                                    max={"16"}
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
                                    disabled={session.Role === Role.Buyer}
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
                                    max={moment(new Date().setFullYear(new Date().getFullYear() + 100)).format("YYYY-MM-DD")}
                                    min={moment(Date.now()).format("YYYY-MM-DD")}
                                    required
                                    disabled={session.Role === Role.Buyer}
                                    errorMessage={{
                                        max: "Passport Expiry Date is not valid"
                                    }}
                                />
                            </Col>
                        </Row>
                        {
                            // show to supplier not to buyer/client
                            session.Role === Role.Supplier ?
                                <Row className="form-group">
                                    <Col sm={6}>
                                        <label className="col-form-label font-weight-bolder" >Reference</label>
                                        <TextInput
                                            type="text"
                                            name="Reference"
                                            className="form-control w-100"
                                            placeholder="Add Reference"
                                            onChange={handleOnChange}
                                            defaultValue={basicDetails.Reference}
                                        />
                                    </Col>
                                </Row>
                                : null
                        }
                        
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