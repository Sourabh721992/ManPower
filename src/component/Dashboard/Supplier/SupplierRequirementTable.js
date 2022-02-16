import React from 'react'
import { Table } from 'react-bootstrap'

export default function SupplierRequirementTable() {
    return (
        <div className='my-3 mx-5'>
            <Table responsive striped borderless>
                <thead>
                    <tr>
                        <th>Code</th>
                        <th>No. of workers</th>
                        <th>Trade</th>
                        <th>Salary</th>
                        <th>Status</th>
                        <th>Buyer</th>
                        <th>Created Date</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>C1111</td>
                        <td>394</td>
                        <td>Plumber</td>
                        <td>32K-40K</td>
                        <td>Pending</td>
                        <td>ABC Buyer</td>
                        <td>20 Dec 2021</td>
                        <td></td>
                    </tr>
                    <tr>
                        <td>C1111</td>
                        <td>394</td>
                        <td>Plumber</td>
                        <td>32K-40K</td>
                        <td>Pending</td>
                        <td>ABC Buyer</td>
                        <td>20 Dec 2021</td>
                        <td></td>
                    </tr>
                    <tr>
                        <td>C1111</td>
                        <td>394</td>
                        <td>Plumber</td>
                        <td>32K-40K</td>
                        <td>Pending</td>
                        <td>ABC Buyer</td>
                        <td>20 Dec 2021</td>
                        <td></td>
                    </tr>
                    <tr>
                        <td>C1111</td>
                        <td>394</td>
                        <td>Plumber</td>
                        <td>32K-40K</td>
                        <td>Pending</td>
                        <td>ABC Buyer</td>
                        <td>20 Dec 2021</td>
                        <td></td>
                    </tr>
                </tbody>
            </Table>
        </div>
    )
}
