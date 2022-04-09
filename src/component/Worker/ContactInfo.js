import moment from 'moment'
import React, {Fragment, useState}  from 'react'
import { Button, Card, Col, Row } from 'react-bootstrap'
import { TextInput, ValidationForm } from 'react-bootstrap4-form-validation'
import Select from 'react-select'
import { LanguagesData } from '../../master-data'
import { filterDropdown } from '../../utils/CommonList'

const ContactInfo = (props) => {

    const [contactDetails, setContactDetails] = useState({
        Address: '',
        FatherName: '',
        SpouseName: '',
        SpouseDOB: '',
        Children: 0,
        PoliceStation: '',
        Language: '',
        Religion: '',
        Remarks: ''
    })

    const [isLanguageError, setIsLanguageError] = useState(false)

    const handleOnChange = (e, data) => {

        let contactDetailsCopy = {...contactDetails}

        const target = e.target;
        // const type = target.type
        // const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        if(name === "Children"){
            contactDetailsCopy[name] = parseInt(target.value)
        }
        else{
            contactDetailsCopy[name] = target.value
        }


        setContactDetails(contactDetailsCopy)

    }

    const handleMultiSelect = (e) => {
        if(e){
            let contactDetailsCopy = {...contactDetails}

            if (Array.isArray(e)) {
                var array = [];
                e.forEach((value, index) => {
                    array.push(value.value)
                });
                contactDetailsCopy.Language = array.toString()
                
                setIsLanguageError(false)
            }

            setContactDetails(contactDetailsCopy)
        }
    }

    const onNextButton = (e) => {
        e.preventDefault();

        if(!contactDetails.Language){
            setIsLanguageError(true)
            return
        }

        // update into parent
        props.handleOnChange(contactDetails, "update-parent", "expertiseInfo")
    }

    const onPrevButton = (e) => {
        // update into parent
        props.handleOnChange(contactDetails, "update-parent", "basicInfo")
    }

    return (
        <Fragment>
            <Card className='shadow-sm'>
                <Card.Header>
                    <h5 className='text-muted'>Contact Details</h5>
                </Card.Header>

                <Card.Body>
                    <ValidationForm onSubmit={onNextButton}>
                        <Row className='form-group'>
                            <Col>
                                <label className="col-form-label font-weight-bolder" >Worker Address</label>
                                <TextInput
                                    id="workerAddress"
                                    type="text"
                                    name="Address"
                                    className="form-control w-100"
                                    placeholder="Enter Address"
                                    onChange={handleOnChange}
                                    defaultValue={contactDetails.Address}
                                    // required
                                    // disabled
                                />
                            </Col>
                            <Col>
                                <label className="col-form-label font-weight-bolder">Father Name<span style={{ color: 'red' }}>*</span></label>
                                <TextInput
                                    id="workerFatherName"
                                    type="text"
                                    name="FatherName"
                                    placeholder="Enter Father Name"
                                    className="form-control w-100"
                                    onChange={handleOnChange}
                                    defaultValue={contactDetails.FatherName}
                                    required
                                    pattern="^([^0-9]*)$"
                                    errorMessage={{
                                        pattern: "Please enter valid name"
                                    }}
                                    // disabled
                                />
                            </Col>
                        </Row>
                        <Row className="form-group">
                            <Col>
                                <label className="col-form-label font-weight-bolder">Spouse Name</label>
                                <TextInput
                                    id="workerSpouseName"
                                    type="text"
                                    name="SpouseName"
                                    className="form-control w-100"
                                    placeholder="Enter Spouse Name"
                                    onChange={handleOnChange}
                                    defaultValue={contactDetails.SpouseName}
                                    pattern="^([^0-9]*)$"
                                    errorMessage={{
                                        pattern: "Please enter valid name"
                                    }}
                                    // required
                                    // disabled
                                />
                            </Col>
                            <Col>
                                <label className="col-form-label font-weight-bolder" >Spouse Date Of Birth</label>
                                <TextInput
                                    id="spouse-date-of-birth-input"
                                    name="SpouseDOB"
                                    type="date"
                                    placeholder="Select date of birth"
                                    className="form-control w-100"
                                    onChange={handleOnChange}
                                    defaultValue={moment(contactDetails.SpouseDOB).format('YYYY-MM-DD')}
                                    max={moment(new Date().setFullYear(new Date().getFullYear() - 18)).format("YYYY-MM-DD")}
                                    // required
                                />
                            </Col>
                            
                        </Row>
                        <Row className="form-group">
                            <Col>
                                <label className="col-form-label font-weight-bolder" >Children</label>
                                <TextInput
                                    id="children-no-input"
                                    name="Children"
                                    type="number"
                                    placeholder="Enter no. of children worker have"
                                    className="form-control w-100"
                                    onChange={handleOnChange}
                                    defaultValue={contactDetails.Children}
                                    // required
                                />
                            </Col>
                            <Col>
                                <label className="col-form-label font-weight-bolder" >Police Station<span style={{ color: 'red' }}>*</span></label>
                                <TextInput
                                    type="text"
                                    name="PoliceStation"
                                    className="form-control w-100"
                                    placeholder="Enter Police Station Address"
                                    onChange={handleOnChange}
                                    defaultValue={contactDetails.PoliceStation}
                                    required
                                />
                            </Col>
                        </Row>
                        <Row className="form-group">
                            <Col>
                                <label className="col-form-label font-weight-bolder" >Language Known<span style={{ color: 'red' }}>*</span></label>
                                <Select
                                    className="basic-single"
                                    classNamePrefix="select"
                                    name="Language"
                                    id="Language"
                                    options={LanguagesData}
                                    isMulti
                                    placeholder="Select Known Languages"
                                    onChange={handleMultiSelect}
                                    value={filterDropdown(LanguagesData, contactDetails.Language.split(','))}
                                    required
                                />
                                {isLanguageError &&
                                    <small className='text-danger'>
                                    Please select at least one language
                                    </small>
                                }
                            </Col>
                            <Col>
                                <label className="col-form-label font-weight-bolder" >Religion</label>
                                <TextInput
                                    id="religion-input"
                                    name="Religion"
                                    type="text"
                                    placeholder="Enter Religion"
                                    className="form-control w-100"
                                    onChange={handleOnChange}
                                    defaultValue={contactDetails.Religion}
                                    // required
                                />
                            </Col>
                        </Row>
                        <Row className="form-group">
                            <Col sm={6}>
                                <label className="col-form-label font-weight-bolder" >Remarks</label>
                                <TextInput
                                    type="text"
                                    name="Remarks"
                                    className="form-control w-100"
                                    placeholder="Enter Remarks"
                                    onChange={handleOnChange}
                                    defaultValue={contactDetails.Remarks}
                                    multiline
                                    rows="3"
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

export default ContactInfo