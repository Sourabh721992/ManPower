import React, { useState, useEffect } from 'react'
import { Card, Form, Table } from 'react-bootstrap'
import { withRouter } from 'react-router-dom'
import { AddMapWorkersApi, GetWorkerListApi } from '../../utils/ApiFunctions'
import { decodeBase64, encodeBase64, formatShortDate, logger } from '../../utils/CommonList'
import UserProfile from '../../utils/UserProfile'
import { LightButton, PrimaryButton } from '../Controls/Buttons/Buttons'
import ReactSpinner from '../Controls/Loader/ReactSpinner'


const MapWorker = (props) => {

    const session = UserProfile.getSession()

    let data, Id
    if (props.match && props.match.params && props.match.params.data) {
        data = JSON.parse(decodeBase64(props.match.params.data))
        if (data && data.requirementId) {
            Id = data.requirementId
        }
    }

    const [workerList, setWorkerList] = useState([])
    const requirementCode = Id
    const [selectedWorkers, setSelectedWorkers] = useState([])
    const [isLoading, setIsLoading] = useState(false)


    useEffect(() => {
        // call get api
        setIsLoading(true)
        GetWorkerListApi({ supplierId: session.UserId })
            .then((response) => {
                let workerListCopy = [...workerList]

                if (response.Code === 1 && response.Message) {
                    workerListCopy = JSON.parse(response.Message)
                    setWorkerList(workerListCopy)
                    logger.log(workerListCopy)
                }
                setIsLoading(false)
            }).catch(() => {
                setIsLoading(false)
            })

    }, [])

    const handleAllCheckbox = (e) => {

        if (e && e.target) {
            let checked = e.target.checked
            let selectedWorkersCopy = [...selectedWorkers]

            if (checked) {
                workerList.forEach(worker => {
                    if (!selectedWorkersCopy.includes(worker.Code)) {
                        selectedWorkersCopy.push(worker.Code)
                    }
                })
            }
            else {
                selectedWorkersCopy = []
            }

            setSelectedWorkers(selectedWorkersCopy)
        }
    }

    const handleCheckbox = (e, wCode) => {
        if (e && e.target && wCode) {
            let checked = e.target.checked
            let selectedWorkersCopy = [...selectedWorkers]

            if (checked) {
                if (!selectedWorkersCopy.includes(wCode)) {
                    selectedWorkersCopy.push(wCode)
                }
            }
            else {
                selectedWorkersCopy = selectedWorkersCopy.filter(c => c !== wCode)
            }

            setSelectedWorkers(selectedWorkersCopy)

        }
    }

    const handleMapWorker = () => {

        if (selectedWorkers.length > 0) {
            const Body = {
                requirementCode: requirementCode,
                workerCodes: selectedWorkers
            }

            AddMapWorkersApi(Body)
                .then(() => {
                    var Data = encodeBase64({ requirementId: requirementCode });

                    props.history.push("/requirement/" + Data)
                })
        }
        else {
            logger.log("no workers selected")
        }

    }

    const handleCancel = () => {
        var Data = encodeBase64({ requirementId: requirementCode });
        props.history.push("/requirement/" + Data)
    }

    if (workerList.length > 0) {
        return (
            // {/* table with check box */}
            <Card className='my-5 mx-5'>
                <Card.Header>
                    <h5 className='font-weight-bolder text-muted'>
                        Assign Workers
                    </h5>
                </Card.Header>
                <Card.Body>
                    <Table responsive striped borderless>
                        <thead className="text-center">
                            <tr>
                                <th>
                                    <Form.Check
                                        inline
                                        type='checkbox'
                                        name="selectAll"
                                        id="selectAll"
                                        onChange={handleAllCheckbox}
                                        checked={workerList.every(w => selectedWorkers.includes(w.Code))}
                                    />
                                </th>
                                <th>Code</th>
                                <th>Name</th>
                                <th>Reference</th>
                                <th>Trade</th>
                                <th>Contact No.</th>
                                <th>Passport No.</th>
                                <th>Added On</th>
                            </tr>
                        </thead>
                        <tbody className="text-center">
                            {workerList.map((item, index) => {
                                return (
                                    <tr style={{ borderRadius: "5px" }} key={item.Code}>
                                        <td>
                                            <Form.Check
                                                inline
                                                type='checkbox'
                                                name="selectAll"
                                                id="selectAll"
                                                onChange={(e) => handleCheckbox(e, item.Code)}
                                                checked={selectedWorkers.includes(item.Code)}
                                            />
                                        </td>
                                        <td>{item.Code}</td>
                                        <td>{item.Name}</td>
                                        <td>{
                                            item.Reference ? item.Reference : "-"
                                        }</td>
                                        <td>{item.Trade}</td>
                                        <td>{item.ContactNo}</td>
                                        <td>{item.PassportNo}</td>
                                        <td>{formatShortDate(item.AddedOn)}</td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </Table>
                </Card.Body>
                <Card.Footer className='bg-transparent d-flex justify-content-between'>
                    <LightButton text={"Cancel"} onClickEvent={handleCancel} />
                    <PrimaryButton disabled={selectedWorkers.length === 0} text={"Map Workers"} onClickEvent={handleMapWorker} />
                </Card.Footer>

                {/* <Row>
                    <Col className='d-flex justify-content-between'>
                        <LightButton text={"Cancel"} onClickEvent={handleCancel}/>
                        <PrimaryButton disabled={selectedWorkers.length === 0} text={"Map Workers"} onClickEvent={handleMapWorker}/>
                    </Col>
                </Row> */}
            </Card>
        )
    }

    if (isLoading) {
        return (
            <ReactSpinner loading={isLoading} />
        )
    }
    else {
        return (
            <Card className='my-3 mx-5'>
                <Card.Body className='d-flex justify-content-center align-items-center text-muted'>
                    No Workers Found
                </Card.Body>
            </Card>
        )
    }

}

export default withRouter(MapWorker)