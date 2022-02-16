import React, {Fragment, useState}  from 'react'
import { Button, Card, Col, Row } from 'react-bootstrap'
import { TextInput, ValidationForm } from 'react-bootstrap4-form-validation'

const ExpertiseInfo = (props) => {

    const [expertiseDetails, setExpertiseDetails] = useState({
        Trade1: '',
        Trade2: '',
        GulfExpr: 0,
        IndiaExpr: 0,
        TotalExpr: 0,
        Education: '',
        VidLink1: '',
        VidLink2: '',
        VidLink3: '',
        CVLink: ''
    })

    const handleOnChange = (e, data) => {

        let expertiseDetailsCopy = {...expertiseDetails}

        const target = e.target;
        // const type = target.type
        // const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        if(name === "GulfExpr" || name === "IndiaExpr" || name === "TotalExpr" ){

            expertiseDetailsCopy[name] = parseFloat(target.value)
        }
        else{
            expertiseDetailsCopy[name] = target.value
        }

        

        // if(type === 'radio'){
        //     basicDetailsCopy[name] = target.value
        // }
        // else if (){

        // }

        setExpertiseDetails(expertiseDetailsCopy)

    }

    const onNextButton = (e) => {
        e.preventDefault();

        // update into parent
        props.handleOnChange(expertiseDetails, "save-worker-api-call")

        // call API
    }

    const onPrevButton = () => {
        // update into parent
        props.handleOnChange(expertiseDetails, "update-parent", "contactInfo")
    }

    return (
        <Fragment>
            <Card className='shadow-sm'>
                <Card.Header>
                    <h5 className='text-muted'>Expertise Details</h5>
                </Card.Header>

                <Card.Body>
                    <ValidationForm onSubmit={onNextButton}>
                        <Row className='form-group'>
                            <Col>
                                <label className="col-form-label font-weight-bolder">Trade<span style={{ color: 'red' }}>*</span></label>
                                <TextInput
                                    id="workerTrade1"
                                    type="text"
                                    name="Trade1"
                                    className="form-control w-100"
                                    placeholder="Enter Trade"
                                    onChange={handleOnChange}
                                    defaultValue={expertiseDetails.Trade1}
                                    required
                                    // disabled
                                />
                            </Col>
                            <Col>
                                <label className="col-form-label font-weight-bolder">Trade<span style={{ color: 'red' }}>*</span></label>
                                <TextInput
                                    type="text"
                                    name="Trade2"
                                    className="form-control w-100"
                                    placeholder="Enter Trade"
                                    onChange={handleOnChange}
                                    defaultValue={expertiseDetails.Trade2}
                                    required
                                    // disabled
                                />
                            </Col>
                        </Row>
                        <Row className="form-group">
                            <Col>
                                <label className="col-form-label font-weight-bolder">Gulf Experience<span style={{ color: 'red' }}>*</span></label>
                                <TextInput
                                    type='text'
                                    // step="0.1"
                                    pattern="[+-]?([0-9]*[.])?[0-9]+"
                                    name="GulfExpr"
                                    className="form-control w-100"
                                    placeholder="Enter Gulf Experience (In Years)"
                                    onChange={handleOnChange}
                                    defaultValue={expertiseDetails.GulfExpr}
                                    required
                                    errorMessage={{
                                        required: "Gulf experience is required",
                                        pattern: "Required valid gulf experience in years"
                                    }}
                                />
                            </Col>
                            <Col>
                                <label className="col-form-label font-weight-bolder" >India Experience<span style={{ color: 'red' }}>*</span></label>
                                <TextInput
                                    type='text'
                                    // step="0.1"
                                    pattern="[+-]?([0-9]*[.])?[0-9]+"
                                    name="IndiaExpr"
                                    className="form-control w-100"
                                    placeholder="Enter India Experience (In Years)"
                                    onChange={handleOnChange}
                                    defaultValue={expertiseDetails.IndiaExpr}
                                    required
                                    errorMessage={{
                                        required: "India experience is required",
                                        pattern: "Required valid india experience in years"
                                    }}
                                />
                            </Col>
                            
                        </Row>
                        <Row className="form-group">
                            <Col>
                                <label className="col-form-label font-weight-bolder" >Total Experience<span style={{ color: 'red' }}>*</span></label>
                                <TextInput
                                    type='text'
                                    // step="0.1"
                                    pattern="[+-]?([0-9]*[.])?[0-9]+"
                                    name="TotalExpr"
                                    className="form-control w-100"
                                    placeholder="Enter Total Experience (In Years)"
                                    onChange={handleOnChange}
                                    defaultValue={expertiseDetails.TotalExpr}
                                    required
                                    errorMessage={{
                                        required: "Total experience is required",
                                        pattern: "Required valid total experience in years"
                                    }}
                                />
                            </Col>
                            <Col>
                                <label className="col-form-label font-weight-bolder" >Education<span style={{ color: 'red' }}>*</span></label>
                                <TextInput
                                    name="Education"
                                    type="text"
                                    placeholder="Enter Course"
                                    className="form-control w-100"
                                    onChange={handleOnChange}
                                    defaultValue={expertiseDetails.Education}
                                    required
                                    errorMessage={{
                                        required: "Education is required",
                                    }}
                                />
                            </Col>
                        </Row>
                        <Row className="form-group">
                            <Col>
                                <label className="col-form-label font-weight-bolder" >Video Link</label>
                                <TextInput
                                    type="text"
                                    name="VidLink1"
                                    className="form-control w-100"
                                    placeholder="Enter Video Link"
                                    onChange={handleOnChange}
                                    defaultValue={expertiseDetails.VidLink1}
                                    pattern="^((http|https)?(://)?)[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$"
                                    errorMessage={{
                                        required: 'Video URL is required',
                                        pattern: 'Video URL is invalid.',
                                    }}
                                />
                            </Col>
                        </Row>
                        <Row className="form-group">
                            <Col>
                                <label className="col-form-label font-weight-bolder" >Video Link</label>
                                <TextInput
                                    type="text"
                                    name="VidLink2"
                                    className="form-control w-100"
                                    placeholder="Enter Video Link"
                                    onChange={handleOnChange}
                                    defaultValue={expertiseDetails.VidLink2}
                                    pattern="^((http|https)?(://)?)[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$"
                                    errorMessage={{
                                        required: 'Video URL is required',
                                        pattern: 'Video URL is invalid.',
                                    }}
                                />
                            </Col>
                        </Row>
                        <Row className="form-group">
                            <Col>
                                <label className="col-form-label font-weight-bolder" >Video Link</label>
                                <TextInput
                                    type="text"
                                    name="VidLink3"
                                    className="form-control w-100"
                                    placeholder="Enter Video Link"
                                    onChange={handleOnChange}
                                    defaultValue={expertiseDetails.VidLink3}
                                    pattern="^((http|https)?(://)?)[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$"
                                    errorMessage={{
                                        required: 'Video URL is required',
                                        pattern: 'Video URL is invalid.',
                                    }}
                                />
                            </Col>
                        </Row>
                        <Row className="form-group">
                            <Col>
                                <label className="col-form-label font-weight-bolder" >CV Link</label>
                                <TextInput
                                    type="text"
                                    name="CVLink"
                                    className="form-control w-100"
                                    placeholder="Enter CV Link"
                                    onChange={handleOnChange}
                                    defaultValue={expertiseDetails.CVLink}
                                    pattern="^((http|https)?(://)?)[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$"
                                    errorMessage={{
                                        required: 'CV URL is required',
                                        pattern: 'CV URL is invalid.',
                                    }}
                                />
                            </Col>
                        </Row>
                        
                        <Row className='mt-5'>
                            <Col className='d-flex justify-content-between'>
                                <Button variant="primary" onClick={() => onPrevButton()}>Previous</Button>
                                <Button type="submit" variant="primary">Save</Button>
                            </Col>
                        </Row>
                        
                    </ValidationForm>
                </Card.Body>
            </Card>
        </Fragment>
    )
}

export default ExpertiseInfo