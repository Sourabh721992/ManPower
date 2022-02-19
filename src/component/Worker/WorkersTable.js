import React, { useState, useEffect} from "react";
import Table from 'react-bootstrap/Table'
import { GetWorkerListApi } from "../../utils/ApiFunctions";
import { formatShortDate, /*logger*/ } from "../../utils/CommonList";
import UserProfile from "../../utils/UserProfile";
// import { ToastSuccess } from "../Controls/Toast/Toast";

const WorkersTable = (props) => {

    const session = UserProfile.getSession()

    const [workerList, setWorkerList] = useState([])

    useEffect(() => {
        // call get api
        GetWorkerListApi({supplierId: session.UserId /*"S8"*/})
        .then((response) => {
            let workerListCopy = [...workerList]

            if(response.Code === 1 && response.Message){
                workerListCopy = JSON.parse(response.Message)
                setWorkerList(workerListCopy)
                // logger.log(workerListCopy)
            }
        })

      }, [])

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