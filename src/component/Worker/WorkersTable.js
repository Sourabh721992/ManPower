import React from "react";
import { Card } from "react-bootstrap";
import Table from 'react-bootstrap/Table'
import { formatShortDate, /*logger*/ } from "../../utils/CommonList";
// import { SuccessNotify } from "../Controls/Toast/Toast";
// import { ToastSuccess } from "../Controls/Toast/Toast";

const WorkersTable = (props) => {

    const workerList = props.workerList
    const isLoading = props.isLoading

    
    if(workerList.length === 0 && !isLoading){
        return (
            <div className='my-3 mx-5'>
                <Card className='shadow-sm mt-4'>
                    <Card.Body className='d-flex justify-content-center align-items-center text-muted'>
                        No Un-Assigned Workers Found
                    </Card.Body>
                </Card>
            </div>
        )
    }

    return (

        <div className='my-3 mx-5'>
            <Table responsive striped borderless>
                <thead className="text-center">
                    <tr>
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
                        return(
                            <tr style={{borderRadius:"5px"}} key={item.Code}>
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
        </div>
    )
}

export default WorkersTable