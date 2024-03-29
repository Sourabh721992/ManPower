import React, {Fragment, useState}  from 'react'
import { Button, Card, Col, Row } from 'react-bootstrap'
import { TextInput, ValidationForm } from 'react-bootstrap4-form-validation'
import Select from 'react-select'
import { Role } from '../../master-data'
import { filterDropdown, getTrades } from '../../utils/CommonList'
import UserProfile from '../../utils/UserProfile'

const ExpertiseInfo = (props) => {

    const session = UserProfile.getSession()

    let Trades = getTrades();
    let TradeOptions = []
    if(Trades){
        Trades.forEach(element => {
            TradeOptions.push({
                value: element.name,
                label: element.name
            })
        });
    }

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
    const [isTradeError, setIsTradeError] = useState(false) 
    const [showAddition, setShowAddition] = useState(true)

    const handleOnChange = (e, data) => {

        let expertiseDetailsCopy = {...expertiseDetails}

        const target = e.target;
        // const type = target.type
        // const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        if(name === "GulfExpr" || name === "IndiaExpr" || name === "TotalExpr" ){

            if(target.value){
                expertiseDetailsCopy[name] = isNaN(target.value) ? 0 : parseFloat(target.value)
            }

            if(name === "GulfExpr" || name === "IndiaExpr"){
                if(showAddition){
                    expertiseDetailsCopy.TotalExpr = expertiseDetailsCopy.GulfExpr + expertiseDetailsCopy.IndiaExpr
                }
            }

            if(name === "TotalExpr"){
                setShowAddition(false)
            }
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

        if(!expertiseDetails.Trade1){
            setIsTradeError(true)
            return
        }

        // update into parent
        props.handleOnChange(expertiseDetails, "save-worker-api-call")

        // call API
    }

    const onPrevButton = () => {
        // update into parent
        props.handleOnChange(expertiseDetails, "update-parent", "contactInfo")
    }

    const handleSelect = (e, field) => {
        let expertiseDetailsCopy = Object.assign({}, expertiseDetails);

        expertiseDetailsCopy[field] = e.value
        setExpertiseDetails(expertiseDetailsCopy)
        if(field === "Trade1"){
            setIsTradeError(false)
        }
        
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
                                <label className="col-form-label font-weight-bolder">Trade 1<span style={{ color: 'red' }}>*</span></label>
                                <Select
                                    className="basic-single"
                                    classNamePrefix="select"
                                    name="Trade1"
                                    id="workerTrade1"
                                    options={TradeOptions}
                                    placeholder="Select Trade 1"
                                    onChange={(e) => handleSelect(e, "Trade1")}
                                    value={filterDropdown(TradeOptions, expertiseDetails.Trade1)}
                                    required
                                    isDisabled={session.Role === Role.Buyer}
                                />
                                {isTradeError &&
                                    <small className='text-danger'>
                                    Please enter worker trade
                                    </small>
                                }
                            </Col>
                            <Col>
                                <label className="col-form-label font-weight-bolder">Trade 2</label>
                                <Select
                                    className="basic-single"
                                    classNamePrefix="select"
                                    name="Trade2"
                                    id="workerTrade2"
                                    options={TradeOptions}
                                    placeholder="Select Trade 2"
                                    onChange={(e) => handleSelect(e, "Trade2")}
                                    value={filterDropdown(TradeOptions, expertiseDetails.Trade2)}
                                    required
                                    isDisabled={session.Role === Role.Buyer}
                                />
                            </Col>
                        </Row>
                        <Row className="form-group">
                            <Col>
                                <label className="col-form-label font-weight-bolder">Gulf Experience(in Years)<span style={{ color: 'red' }}>*</span></label>
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
                                    disabled={session.Role === Role.Buyer}
                                />
                            </Col>
                            <Col>
                                <label className="col-form-label font-weight-bolder" >India Experience(in Years)<span style={{ color: 'red' }}>*</span></label>
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
                                    disabled={session.Role === Role.Buyer}
                                />
                            </Col>
                            
                        </Row>
                        <Row className="form-group">
                            <Col>
                                <label className="col-form-label font-weight-bolder" >Total Experience(in Years)<span style={{ color: 'red' }}>*</span></label>
                                <TextInput
                                    type='text'
                                    // step="0.1"
                                    pattern="[+-]?([0-9]*[.])?[0-9]+"
                                    name="TotalExpr"
                                    className="form-control w-100"
                                    placeholder="Enter Total Experience (In Years)"
                                    onChange={handleOnChange}
                                    // defaultValue={}
                                    value={expertiseDetails.TotalExpr}
                                    required
                                    errorMessage={{
                                        required: "Total experience is required",
                                        pattern: "Required valid total experience in years"
                                    }}
                                    disabled={session.Role === Role.Buyer}
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
                                <label className="col-form-label font-weight-bolder" >Video Link<span style={{ color: 'red' }}>*</span></label>
                                {
                                    session.Role === Role.Supplier ?
                                        <TextInput
                                            type="text"
                                            name="VidLink1"
                                            className="form-control w-100"
                                            placeholder="Enter Video Link"
                                            onChange={handleOnChange}
                                            defaultValue={expertiseDetails.VidLink1}
                                            pattern="^((http|https)?(://)?)[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$"
                                            required
                                            errorMessage={{
                                                required: 'Video URL is required',
                                                pattern: 'Video URL is invalid.',
                                            }}
                                            disabled={session.Role === Role.Buyer}
                                        />
                                        : expertiseDetails.VidLink1 ?
                                            <a href={expertiseDetails.VidLink1}>{expertiseDetails.VidLink1}</a> : "Not Available"
                                }
                            </Col>
                        </Row>
                        <Row className="form-group">
                            <Col>
                                <label className="col-form-label font-weight-bolder" >Video Link</label>
                                {
                                    session.Role === Role.Supplier ?
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
                                        : expertiseDetails.VidLink2 ?
                                        <a href = {expertiseDetails.VidLink2}>{expertiseDetails.VidLink2}</a> : "Not Available"
                                }
                            </Col>
                        </Row>
                        <Row className="form-group">
                            <Col>
                                <label className="col-form-label font-weight-bolder" >Video Link</label>
                                {
                                    session.Role === Role.Supplier ?
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
                                        : expertiseDetails.VidLink3 ?
                                        <a href ={expertiseDetails.VidLink3}>{expertiseDetails.VidLink3}</a> : "Not Available"
                                }
                                
                                
                            </Col>
                        </Row>
                        <Row className="form-group">
                            <Col>
                                <label className="col-form-label font-weight-bolder" >CV Link</label>
                                {
                                    session.Role === Role.Supplier ?
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
                                        : expertiseDetails.CVLink ?
                                            <a href={expertiseDetails.CVLink}>{expertiseDetails.CVLink}</a> : "Not Available"
                                }
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