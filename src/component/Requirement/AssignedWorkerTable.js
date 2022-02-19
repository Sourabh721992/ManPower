import React, {useState} from 'react'
import { Card, Table } from 'react-bootstrap'
import { RemoveWorkerApi } from '../../utils/ApiFunctions'
import { formatShortDate } from '../../utils/CommonList'
import { DeleteIconBtn } from '../Controls/Buttons/IconButtons'


const AssignedWorkerTable = (props) => {

    const [workerList, setWorkerList] = useState(props.details.Workers) 
    const [details, setDetails] = useState(props.details) 
    const [isLoading, setIsLoading] = useState(false)

    const handleDelete = (wCode) => {
        if(wCode && details){
            setIsLoading(true)
            const Body = {
                requirementCode: details.Code,
                workerCode: wCode
            }

            RemoveWorkerApi(Body).then((response) => {
                if (response.Code === 1) {
                    let workerListCopy = [...workerList]

                    workerListCopy = workerListCopy.filter(w => w.Code !== wCode)

                    setWorkerList(workerListCopy)
                    
                }
                setIsLoading(false)
            }).catch(() => {
                setIsLoading(false)
            })
        }

        
    }


    if (workerList && workerList.length > 0) {
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
                            {workerList.map((item, index) => {
                                return (
                                    <tr style={{ borderRadius: "5px" }} key={item.Code}>
                                        <td>{item.Code}</td>
                                        <td>{item.Name}</td>
                                        <td>{
                                            item.Reference ? item.Reference : "-"
                                        }</td>
                                        <td>{item.Status}</td>
                                        <td>{item.ContactNo}</td>
                                        <td>{formatShortDate(item.AddedOn)}</td>
                                        <td>
                                            <DeleteIconBtn disabled={isLoading} onClickEvent={() => handleDelete(item.Code)} />
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
    else if(workerList && workerList.length === 0){
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