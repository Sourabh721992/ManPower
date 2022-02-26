import React, {useState, useEffect} from 'react'
import { ButtonGroup, Card, Dropdown, DropdownButton, Table } from 'react-bootstrap'
import { FiEdit } from 'react-icons/fi'
import { RequirementStatus, WorkerStatusDropdownList } from '../../master-data'
import { RemoveWorkerApi, WorkerUpdateStatusApi } from '../../utils/ApiFunctions'
import { filterDropdown, formatShortDate } from '../../utils/CommonList'
import { DeleteIconBtn } from '../Controls/Buttons/IconButtons'
import Select from 'react-select'
import Remark from '../Worker/Remark'


const AssignedWorkerTable = (props) => {

    const [details, setDetails] = useState(props.details)
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        if(JSON.stringify(details) !== JSON.stringify(props.details)){
            setDetails(props.details)
        }
    }, [props.details])
    

    const handleDelete = (wCode) => {
        if(wCode && details){
            setIsLoading(true)
            const Body = {
                requirementCode: details.Code,
                workerCode: wCode
            }

            RemoveWorkerApi(Body).then((response) => {
                if (response.Code === 1) {
                    let requirementDataCopy = Object.assign({}, details);
                    requirementDataCopy.Workers = requirementDataCopy.Workers.filter(w => w.Code !== wCode)

                    setDetails(requirementDataCopy)

                    if (props.updateParent) {
                        props.updateParent("update-requirement-details", requirementDataCopy)
                    }
                }
                setIsLoading(false)
            }).catch(() => {
                setIsLoading(false)
            })
        }
    }

    const handleStatusChangeDropDown = (e, wCode) => {
        if (e.value && wCode) {
            setIsLoading(true)
            const Body = {
                status: e.value,
                workerCode: wCode
            }
            WorkerUpdateStatusApi(Body)
                .then(() => {
                    let requirementDataCopy = Object.assign({}, details);

                    let worker = requirementDataCopy.Workers.find(w => w.Code === wCode)
                    worker.Status = e.value
                    let index = requirementDataCopy.Workers.indexOf(worker)
                    requirementDataCopy.Workers[index] = worker

                    setDetails(requirementDataCopy)

                    if (props.updateParent) {
                        props.updateParent("update-requirement-details", requirementDataCopy)
                    }
                    setIsLoading(false)
                }).catch(() => {
                    setIsLoading(false)
                })
            
        }
    };


    if (details.Workers && details.Workers.length > 0) {
        return (
            <Card className='shadow-sm mt-4'>
                <Card.Header>
                    <h5 className='font-weight-bolder text-muted'>
                        Assigned Worker List
                    </h5>
                </Card.Header>
                <Card.Body>
                    <Table responsive striped borderless>
                        <thead className="text-center">
                            <tr>
                                <th>Code</th>
                                <th>Name</th>
                                <th>Reference</th>
                                <th>Status</th>
                                <th>Contact No.</th>
                                <th>Created Date</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody className="text-center">
                            {details.Workers.map((item, index) => {
                                return (
                                    <tr style={{ borderRadius: "5px" }} key={item.Code}>
                                        <td>{item.Code}</td>
                                        <td>{item.Name}</td>
                                        <td>{
                                            item.Reference ? item.Reference : "-"
                                        }</td>
                                        <td >{
                                            // UPDATE WORKER STATUS
                                            <Select
                                                name="statusValue"
                                                placeholder="Assign Status"
                                                options={WorkerStatusDropdownList}
                                                onChange={(e) => handleStatusChangeDropDown(e,item.Code)}
                                                value={filterDropdown(WorkerStatusDropdownList, item.Status)}
                                                // isLoading={isLoading}
                                                // components={{ LoadingIndicator }}
                                                // isDisabled={statusValue === ApplicantStatusData.JOINED}
                                            ></Select>
                                        }</td>
                                        <td>{item.ContactNo}</td>
                                        <td>{formatShortDate(item.AddedOn)}</td>
                                        <td>
                                            {/* dropdown actions */}
                                            <DropdownButton
                                                as={ButtonGroup}
                                                drop="left"
                                                // key={variant}
                                                id={`dropdown-${item.Code}`}
                                                variant="link"
                                                title={""}
                                            >
                                                {/* DROPDOWN ITEM - REMARKS */}
                                                <Remark workerCode={item.Code} SellerRemarks={item.SellerRemarks} BuyerRemarks={item.BuyerRemarks} />

                                                <Dropdown.Item eventKey="edit_worker"><FiEdit/> Edit</Dropdown.Item>
                                            </DropdownButton>
                                            {/* delete assigned worker */}
                                            {
                                                details.Status === RequirementStatus.PENDING ?
                                                    <DeleteIconBtn disabled={isLoading} onClickEvent={() => handleDelete(item.Code)} />
                                                : null
                                            }
                                            
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </Table>
                </Card.Body>
            </Card>

        )
    }
    else if(details.Workers && details.Workers.length === 0){
        return (
            <Card className='shadow-sm mt-4'>
                <Card.Body className='d-flex justify-content-center align-items-center text-muted'>
                    No Assigned Workers Found
                </Card.Body>
            </Card>
        )
    }

    return null

}

export default (AssignedWorkerTable)