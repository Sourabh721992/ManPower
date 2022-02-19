import React, {Fragment, useState, useEffect} from 'react'
import { Card, Table } from 'react-bootstrap'
import { formatShortDate } from '../../utils/CommonList'
import { DeleteIconBtn } from '../Controls/Buttons/IconButtons'


const AssignedWorkerTable = (props) => {

    const workerList = props.workerList

    const handleDelete = () => {

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
                                            <DeleteIconBtn onClickEvent={(e) => handleDelete(e)} />
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