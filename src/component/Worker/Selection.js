import React, { Fragment, useState, useEffect } from 'react'
import { Card, Row, Col, Button } from 'react-bootstrap'
import { ValidationForm, TextInput, Radio } from 'react-bootstrap4-form-validation';
import moment from "moment";
import { usePrevious } from '../../utils/CustomHook';
import UserProfile from '../../utils/UserProfile';
import { Role } from '../../master-data';

const Selection = (props) => {

    const session = UserProfile.getSession()

    const [selectionDetails, setSelectionInfo] = useState({
        ReceivedByClient: false,
        SelectConfirmDate: null,
        SelectedBy: '',
        SelectionConfirmedByHead: false,
        DocsSendDate : null,
    })

    const prevProps = usePrevious(props.workerData);
    useEffect(() => {
        if (prevProps && prevProps !== props.workerData) {
            if(props.workerData){
                let selectionDetailsCopy = Object.assign({}, selectionDetails);
                let data = props.workerData

                selectionDetailsCopy.ReceivedByClient = data.ReceivedByClient ? data.ReceivedByClient : selectionDetailsCopy.ReceivedByClient
                selectionDetailsCopy.SelectConfirmDate = data.SelectConfirmDate ? data.SelectConfirmDate : selectionDetailsCopy.SelectConfirmDate
                selectionDetailsCopy.SelectedBy = data.SelectedBy ? data.SelectedBy : selectionDetailsCopy.SelectedBy
                selectionDetailsCopy.SelectionConfirmedByHead = data.SelectionConfirmedByHead ? data.SelectionConfirmedByHead : selectionDetailsCopy.SelectionConfirmedByHead
                selectionDetailsCopy.DocsSendDate = data.DocsSendDate ? data.DocsSendDate : selectionDetailsCopy.DocsSendDate
                
                setSelectionInfo(selectionDetailsCopy)
            }
        }
        
    }, [props.workerData])
      
    
    
    const handleOnChange = (e, data) => {

        if (e && e.target) {
            let selectionDetailsCopy = Object.assign({}, selectionDetails);

            const target = e.target;
            // const type = target.type
            let value = target.value;
            const name = target.name;

            if(target.type === 'radio'){
                value = value === 'true' ? true : false
            }

            selectionDetailsCopy[name] = value

            setSelectionInfo(selectionDetailsCopy)
        }
    }

    const onNextButton = (e) => {
        e.preventDefault();
        
        // update into parent
        props.handleOnChange(selectionDetails, "update-progress-api")
    }

    return (
        <Fragment>
            <Card className='shadow-sm'>
                <Card.Header>
                    <h5 className='text-muted'>Selection Details</h5>
                </Card.Header>

                <Card.Body>
                    <ValidationForm onSubmit={onNextButton}>
                        <Row className='form-group'>
                            <Col>
                                <label className="col-form-label font-weight-bolder">Received By Client</label>
                                <Radio.RadioGroup name="ReceivedByClient" valueSelected={selectionDetails.ReceivedByClient.toString()}
                                    onChange={handleOnChange}>
                                    <Radio.RadioItem id="yes" label="Yes" value="true" />
                                    <Radio.RadioItem id="no" label="No" value="false" />
                                </Radio.RadioGroup>
                            </Col>
                            <Col>
                                <label className="col-form-label font-weight-bolder">Select Confirm Date</label>
                                <TextInput
                                    id="SelectConfirmDate-input"
                                    name="SelectConfirmDate"
                                    type="date"
                                    placeholder="Select Confirm Date"
                                    className="form-control w-100"
                                    onChange={handleOnChange}
                                    value={moment(selectionDetails.SelectConfirmDate).format('YYYY-MM-DD')}
                                    // max={moment(Date.now()).format("YYYY-MM-DD")}
                                    // required
                                />
                            </Col>
                        </Row>
                        <Row className="form-group">
                            <Col>
                                <label className="col-form-label font-weight-bolder">Selected Confirm By</label>
                                <TextInput
                                    id="selected-by"
                                    type="text"
                                    name="SelectedBy"
                                    className="form-control w-100"
                                    placeholder="Selected By"
                                    onChange={handleOnChange}
                                    value={selectionDetails.SelectedBy}
                                    
                                    // required
                                />
                            </Col>
                            <Col>
                                <label className="col-form-label font-weight-bolder">Selection Confirmed By Head </label>
                                <Radio.RadioGroup name="SelectionConfirmedByHead" required valueSelected={selectionDetails.SelectionConfirmedByHead.toString()}
                                    onChange={handleOnChange}>
                                    <Radio.RadioItem id="yes" label="Yes" value="true" disabled={session.Role === Role.Buyer}/>
                                    <Radio.RadioItem id="no" label="No" value="false" disabled={session.Role === Role.Buyer}/>
                                </Radio.RadioGroup>
                            </Col>
                        </Row>
                        <Row className="form-group">
                            <Col sm={6}>
                                <label className="col-form-label font-weight-bolder" >Document Send Date</label>
                                <TextInput
                                    id="document-send-date-input"
                                    name="DocsSendDate"
                                    type="date"
                                    placeholder="Select document send date"
                                    className="form-control w-100"
                                    onChange={handleOnChange}
                                    value={moment(selectionDetails.DocsSendDate).format('YYYY-MM-DD')}
                                    disabled={session.Role === Role.Buyer}
                                    // max={moment(Date.now()).format("YYYY-MM-DD")}
                                    // required
                                />
                            </Col>
                        </Row>
                        <Row className='mt-5'>
                            <Col className='d-flex justify-content-end'>
                                <Button type="submit" variant="primary">Update</Button>
                            </Col>
                        </Row>
                    </ValidationForm>
                </Card.Body>
            </Card>
        </Fragment>
    )
}

export default Selection