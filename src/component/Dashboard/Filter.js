import React, { Fragment, useState, useEffect } from 'react'
import { Col, FormControl, Row, Modal } from 'react-bootstrap'
import { FiFilter } from 'react-icons/fi';
import Select from 'react-select';
import { RequirementStatusDropdownList } from '../../master-data';
import { filterDropdown, getTrades } from '../../utils/CommonList';
import { FilterButton, LightButton, PrimaryButton } from '../Controls/Buttons/Buttons'
import { ErrorNotify } from '../Controls/Toast/Toast';

const Filter = (props) => {

    const [OriginalData, setOriginalData] = useState(props.originalData)
    const [showModal, setShowModal] = useState(false)
    const filterFor = props.for
    //FOR REQUIREMET FILTER
    const [RequirementCode, setRequirementCode] = useState('');
    const [requirementStatus, setRequirementStatus] = useState(null)
    // FOR WORKER FILTER
    let Trades = getTrades();
    let TradeOptions = []
    if(Trades && filterFor && filterFor === "workerList"){
        Trades.forEach(element => {
            TradeOptions.push({
                value: element.name,
                label: element.name
            })
        });
    }

    const [tradeValue, setTradeValue] = useState('')
    const [workerName, setWorkerName] = useState('')
    const [contactNo, setContactNo] = useState('')
    const [passportNo, setPassportNo] = useState('')
    const [reference, setReference] = useState('')
    

    useEffect(() => {
        if(JSON.stringify(OriginalData) !== JSON.stringify(props.originalData)){
            setOriginalData(props.originalData)
        }
      
    }, [props.originalData])
    

    const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
        <span
            ref={ref}
            onClick={(e) => {
                e.preventDefault();
                onClick(e);
            }}
            // className="text-primary"
            style={{ cursor: "pointer" }}
        >
            {children}
        </span>
    ));

    const CustomMenu = React.forwardRef(
        ({ children, style, className, 'aria-labelledby': labeledBy }, ref) => {
            // const [value, setValue] = useState('');
            // const [requirementStatus, setRequirementStatus] = useState(null)

            // const handleOnChangeStatus = (e) => {
            //     setRequirementStatus(e.value)
            // }

            // const handleTextBox = (e) => {
            //     setValue(e.target.value)
            // }

            // const clickOnApply = (e) => {
            //     e.preventDefault();
            //     if(OriginalData && OriginalData.length > 0){
            //         let FilteredData = OriginalData
            //         // requirement status
            //         if(requirementStatus != null){
            //             FilteredData = FilteredData.filter(r => r.Status === requirementStatus)
            //         }
                    
            //         // requirement code
            //         if(value){
            //             FilteredData = FilteredData.filter(r => r.Code.includes(value))
            //         }

            //         if(props.UpdateParent){
            //             props.UpdateParent('filterApplied', FilteredData)
            //         }
            //     }
            //     else {
            //         ErrorNotify("No requirements to filter")
            //     }

            // }

            // const handleClearFilter = () => {
            //     setValue('')
            //     setRequirementStatus(null)
            //     if(props.UpdateParent){
            //         props.UpdateParent('clearFilter')
            //     }
            // }

            // return (
            //     <div
            //         ref={ref}
            //         style={style}
            //         className={className}
            //         aria-labelledby={labeledBy}
            //     >

            //         <Form noValidate onSubmit={clickOnApply} className="mx-3">
            //             <Row className='form-group'>
            //                 <Col>
            //                     <label className="col-form-label font-weight-bolder">Worker Name</label>
            //                     <Text key="txtClient" value={value} id="txtClient" name="client" type="text" onChange={handleTextBox}  />
            //                 </Col>
            //             </Row>
            //             <Row className='form-group'>
            //                 <Col>
            //                     <Select
            //                         // autoFocus
            //                         name="requirementStatus"
            //                         placeholder="Requirement Status"
            //                         options={RequirementStatusDropdownList}
            //                         onChange={(e) => handleOnChangeStatus(e)}
            //                         value={filterDropdown(RequirementStatusDropdownList, requirementStatus)}
            //                     ></Select>
            //                 </Col>
            //             </Row>

            //             <Row className=''>
            //                 <Col className='d-flex justify-content-end'>
            //                     <Button variant="secondary" onClick={handleClearFilter}>Clear</Button>
            //                     <Button type="submit" variant="primary">Apply</Button>
            //                 </Col>
            //             </Row>

            //         </Form>


                    

            //     </div>
            // );
        },
    );


    //////////////////////////////////

    const resetFields = () => {
        setRequirementCode('')
        setRequirementStatus(null)
        setTradeValue('')
        setWorkerName('')
        setContactNo('')
        setPassportNo('')
        setReference('')
        setShowModal(false)
    }

    const handleClearFilter = () => {
        resetFields()
        if (props.UpdateParent) {
            props.UpdateParent('clearFilter')
        }
    }

    const clickOnApply = (e) => {
        if (OriginalData && OriginalData.length > 0) {
            let FilteredData = OriginalData
            // requirement status
            if (requirementStatus != null) {
                FilteredData = FilteredData.filter(r => r.Status === requirementStatus)
            }

            // requirement code
            if (RequirementCode) {
                FilteredData = FilteredData.filter(r => r.Code.includes(RequirementCode))
            }

            // worker trade
            if (tradeValue) {
                FilteredData = FilteredData.filter(r => r.Trade === tradeValue)
            }

            // worker name
            if (workerName) {
                FilteredData = FilteredData.filter(r => r.Name.includes(workerName))
            }

            // Contact no
            if (contactNo) {
                FilteredData = FilteredData.filter(r => r.ContactNo.includes(contactNo))
            }

            // Passport No
            if (passportNo) {
                FilteredData = FilteredData.filter(r => r.PassportNo.includes(passportNo))
            }

            // Reference
            if (reference) {
                FilteredData = FilteredData.filter(r => r.Reference && r.Reference.includes(reference))
            }

            if (props.UpdateParent) {
                props.UpdateParent('filterApplied', FilteredData)
            }
            setShowModal(false)
        }
        else {
            ErrorNotify("No requirements to filter")
        }

    }

    const handleOnChangeDropdown = (e, field) => {
        if(field === "Trade"){
            setTradeValue(e.value)
        }
        else if(field === "requirementStatus"){
            setRequirementStatus(e.value)
        }
        else if(field === "contactNo"){
            setContactNo(e.value)
        }
        else if(field === "passportNo"){
            setPassportNo(e.value)
        }
        else if(field === "reference"){
            setReference(e.value)
        }
        
    }

    const handleTextBox = (e) => {
        const name = e.target.name
        const value = e.target.value
        if(name === "requirementCode"){
            setRequirementCode(value)
        }
        else if (name === "workerName"){
            setWorkerName(value)
        }
        else if (name === "contactNo"){
            setContactNo(value)
        }
        else if (name === "passportNo"){
            setPassportNo(value)
        }
        else if (name === "reference"){
            setReference(value)
        }
    }


    return (
        <Fragment>
            {/* <Dropdown drop="left" autoClose="outside">
                <Dropdown.Toggle as={CustomToggle} id="dropdown-custom-components">
                    <FilterButton/>
                </Dropdown.Toggle>

                <Dropdown.Menu as={CustomMenu}>

                </Dropdown.Menu>
            </Dropdown> */}
            <FilterButton className={props.className} onClickEvent={() => setShowModal(true)}/>
            {/* Filter modal */}
            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header>
                    <Modal.Title as="h5"><FiFilter /> Filter</Modal.Title>
                </Modal.Header>
                {
                    filterFor && filterFor === "workerList" ?
                        <Modal.Body>
                            <Row className='form-group'>
                                <Col sm={8}>
                                    <label className="col-form-label font-weight-bolder">Trade</label>
                                    <Select
                                        className="basic-single"
                                        classNamePrefix="select"
                                        name="Trade"
                                        id="workerTrade"
                                        options={TradeOptions}
                                        placeholder="Select Trade"
                                        onChange={(e) => handleOnChangeDropdown(e, "Trade")}
                                        value={filterDropdown(TradeOptions, tradeValue)}
                                    />
                                </Col>
                            </Row>
                            <Row className='form-group'>
                                <Col sm={8}>
                                    <label className="col-form-label font-weight-bolder" >Worker Name</label>
                                    <FormControl
                                        className='w-100'
                                        type='text'
                                        name="workerName"
                                        placeholder="Enter Worker Name"
                                        onChange={(e) => handleTextBox(e)}
                                        value={workerName}
                                    />
                                </Col>
                            </Row>
                            <Row className='form-group'>
                                <Col sm={8}>
                                    <label className="col-form-label font-weight-bolder" >Contact No</label>
                                    <FormControl
                                        className='w-100'
                                        type='text'
                                        name="contactNo"
                                        placeholder="Enter Contact No"
                                        onChange={(e) => handleTextBox(e)}
                                        value={contactNo}
                                    />
                                </Col>
                            </Row>
                            <Row className='form-group'>
                                <Col sm={8}>
                                    <label className="col-form-label font-weight-bolder" >Passport No</label>
                                    <FormControl
                                        className='w-100'
                                        type='text'
                                        name="passportNo"
                                        placeholder="Enter Passport No"
                                        onChange={(e) => handleTextBox(e)}
                                        value={passportNo}
                                    />
                                </Col>
                            </Row>
                            <Row className='form-group'>
                                <Col sm={8}>
                                    <label className="col-form-label font-weight-bolder" >Reference</label>
                                    <FormControl
                                        className='w-100'
                                        type='text'
                                        name="reference"
                                        placeholder="Enter Reference"
                                        onChange={(e) => handleTextBox(e)}
                                        value={reference}
                                    />
                                </Col>
                            </Row>
                        </Modal.Body>
                        :
                        <Modal.Body>
                            <Row className='form-group'>
                                <Col sm={8}>
                                    <label className="col-form-label font-weight-bolder" >Requirement Status</label>
                                    <Select
                                        // autoFocus
                                        name="requirementStatus"
                                        placeholder="Select Requirement Status"
                                        options={RequirementStatusDropdownList}
                                        onChange={(e) => handleOnChangeDropdown(e, "requirementStatus")}
                                        value={filterDropdown(RequirementStatusDropdownList, requirementStatus)}
                                    ></Select>
                                </Col>
                            </Row>
                            <Row className='form-group'>
                                <Col sm={8}>
                                    <label className="col-form-label font-weight-bolder" >Requirement Code</label>
                                    <FormControl
                                        className='w-100'
                                        type='text'
                                        name="requirementCode"
                                        placeholder="Enter Requirement Code"
                                        onChange={(e) => handleTextBox(e)}
                                        value={RequirementCode}
                                    />
                                </Col>
                            </Row>
                        </Modal.Body>
                }

                <Modal.Footer>
                    <LightButton text={"Clear"} onClickEvent={handleClearFilter}/>
                    <PrimaryButton text={"Apply"} onClickEvent={clickOnApply}/>
                </Modal.Footer>
            </Modal>
        </Fragment>
    )
}

export default Filter