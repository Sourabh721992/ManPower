import React, {useState, useEffect} from 'react'
import { Card, Dropdown, Table } from 'react-bootstrap'
import { FiTrash2 } from 'react-icons/fi'
import { RequirementStatus, Role } from '../../master-data'
import { RemoveWorkerApi } from '../../utils/ApiFunctions'
import { encodeBase64, formatShortDate } from '../../utils/CommonList'
import Remark from '../Worker/Remark'
import { BsFileText, BsThreeDotsVertical } from 'react-icons/bs'
import { withRouter } from 'react-router-dom'
import UserProfile from '../../utils/UserProfile'
import UpdateWorkerStatus from './UpdateWorkerStatus'


const AssignedWorkerTable = (props) => {

    const session = UserProfile.getSession()

    const [details, setDetails] = useState(props.details)
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        if(JSON.stringify(details) !== JSON.stringify(props.details)){
            setDetails(props.details)
        }
    }, [props.details])
    

    const handleDelete = (wCode) => {
        if(wCode && details){
            // setIsLoading(true)
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

    const handleUpdateProgress = (wCode) => {
        if(wCode && details){

            var Data = encodeBase64({ requirementId: details.Code, workerCode: wCode });
            props.history.push("/workerProgress/" + Data)

        }
    }

    const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (

        <span
            ref={ref}
            onClick={(e) => {
                e.preventDefault();
                onClick(e);
            }}
            className="text-primary"
            style={{cursor:"pointer"}}
        >
            {children}
        </span>
    ));


    if (details.Workers && details.Workers.length > 0) {
        return (
            <Card className='shadow-sm mt-4'>
                <Card.Header>
                    <h5 className='font-weight-bolder text-muted'>
                        Assigned Worker List
                    </h5>
                </Card.Header>
                <Card.Body>
                    <Table responsive striped borderless hover>
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
                                    <tr style={session.Role === Role.Supplier ? { borderRadius: "5px", cursor: "pointer" } : {borderRadius: "5px"}} key={item.Code} onClick={session.Role === Role.Supplier ? () => handleUpdateProgress(item.Code): null}>
                                        <td>{item.Code}</td>
                                        <td>{item.Name}</td>
                                        <td>{
                                            item.Reference ? item.Reference : "-"
                                        }</td>
                                        <td ><UpdateWorkerStatus details={details} workerDetails={item}/> </td>
                                        <td>{item.ContactNo}</td>
                                        <td>{formatShortDate(item.AddedOn)}</td>
                                        <td>
                                            <Dropdown drop="left">
                                                <Dropdown.Toggle as={CustomToggle} id="dropdown-custom-components">
                                                    <BsThreeDotsVertical />
                                                </Dropdown.Toggle>

                                                <Dropdown.Menu>
                                                    {/* DROPDOWN ITEM - REMARKS */}
                                                    <Remark requirementCode={details.Code} workerCode={item.Code} SellerRemarks={item.SellerRemarks} BuyerRemarks={item.BuyerRemarks} />

                                                    {/* delete assigned worker */}
                                                    {
                                                        details.Status === RequirementStatus.PENDING ?
                                                            <Dropdown.Item eventKey="update_worker_progress" onClick={() => handleDelete(item.Code)}>
                                                                <FiTrash2 className='text-danger' /> Delete
                                                            </Dropdown.Item>
                                                            :
                                                            // {/* Update Worker Progress only for supplier */}
                                                            session.Role === Role.Supplier &&
                                                            <Dropdown.Item eventKey="update_worker_progress" onClick={() => handleUpdateProgress(item.Code)}>
                                                                <BsFileText className='text-primary' /> Edit Progress
                                                            </Dropdown.Item>
                                                    }
                                                </Dropdown.Menu>
                                            </Dropdown>
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

export default withRouter(AssignedWorkerTable)