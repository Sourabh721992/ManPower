import React from "react";
import "../../Css/app.css";
import "react-phone-number-input/style.css";
import Table from 'react-bootstrap/Table'
import { encodeBase64, formatShortDate, getMoneyFormat, setItemToLocalStorage, /*logger*/ } from "../../utils/CommonList";
// import {SearchIconBtn, UsersIconBtn} from "../Controls/Buttons/IconButtons";
import { withRouter } from "react-router-dom";

function RequirementTable(props) {
    // // console.log(props.detail);

    // function onSearchBtnClick(e){
    //     logger.log(e)
    // }

    // function onClickBtn(e) {
    //     logger.log(e)
    // }

    function handleOnClick(rCode, bName, sName){
        if(rCode){
            //set to local storage
            setItemToLocalStorage(rCode, {buyerName: bName, supplierName: sName})

            var Data = encodeBase64({ requirementId: rCode  });
            props.history.push("/requirement/" + Data)
        }
    }

    return (

        <div className='my-3 mx-5 '>
            <Table responsive striped borderless hover>
                <thead className="text-center">
                    <tr>
                        <th>Code</th>
                        <th>No. of workers</th>
                        <th>Trade</th>
                        <th>Salary</th>
                        <th>Status</th>
                        <th>Buyer</th>
                        <th>Created Date</th>
                        {/* <th>Action</th> */}
                    </tr>
                </thead>
                <tbody className="text-center">
                    {props.detail.map((item, index) => {
                        return(
                            <tr className="align-middle" style={{cursor: "pointer"}} key={item.Code} onClick={() => handleOnClick(item.Code, item.BuyerName, item.SupplierName)}>
                                <td>{item.Code}</td>
                                <td>{item.WorkersCount}</td>
                                <td>{item.Trades.map((s, i) => {
                                    return (
                                        <div key={"req_trade_cell_ " + i}><label>
                                            {s.Name}
                                        </label><br /></div>
                                    )
                                })}</td>
                                <td>{item.Trades.map((s, i) => {
                                    return(
                                        <div key={"req_sal_cell_ " + i}><span>
                                            {getMoneyFormat(s.MaxSalary, s.Currency)}-{getMoneyFormat(s.MinSalary, s.Currency)}
                                        </span><br /></div>
                                    )
                                })}</td>
                                <td>{item.Status}</td>
                                <td>{item.BuyerName}</td>
                                <td>{formatShortDate(item.CreatedDate)}</td>
                                {/* <td>
                                    <UsersIconBtn onClickEvent={(e) => onClickBtn(e)} />
                                    <SearchIconBtn onClickEvent={(e) => onSearchBtnClick(e)}/>
                                </td> */}
                            </tr>
                        )
                    })}
                </tbody>
            </Table>
        </div>
    )
}

export default withRouter(RequirementTable)