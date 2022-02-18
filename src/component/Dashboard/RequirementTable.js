import React from "react";
import "../../Css/app.css";
import "react-phone-number-input/style.css";
import Table from 'react-bootstrap/Table'
import { AiOutlineSearch } from "react-icons/ai";
import { IconContext } from "react-icons";
import { formatShortDate, getMoneyFormat, logger } from "../../utils/CommonList";
import { FaSearch } from "react-icons/fa";
import { Button } from "react-bootstrap";
import {SearchIconBtn, UsersIconBtn} from "../Controls/Buttons/IconButtons";

export default function RequirementTable(props) {
    console.log(props.detail);

    function onSearchBtnClick(e){
        logger.log(e)
    }

    function onClickBtn(e) {
        logger.log(e)
    }

    return (

        <div className='my-3 mx-5 '>
            <Table responsive striped borderless>
                <thead className="text-center">
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
                <tbody className="text-center">
                    {props.detail.map((item, index) => {
                        return(
                            <tr key={"requirement_table_index_" + index} style={{verticalAlign:"center"}}>
                                <td>{item.Code}</td>
                                <td>{item.WorkersCount}</td>
                                <td>{item.Trades.map((s, i) => {
                                    return (
                                        <><label key={"req_trade_cell_ " + i}>
                                            {s.Name}
                                        </label><br /></>
                                    )
                                })}</td>
                                <td>{item.Trades.map((s, i) => {
                                    return(
                                        <><span key={"req_sal_cell_ " + i}>
                                            {getMoneyFormat(s.MaxSalary, s.Currency)}-{getMoneyFormat(s.MinSalary, s.Currency)}
                                        </span><br /></>
                                    )
                                })}</td>
                                <td>{item.Status}</td>
                                <td>{item.BuyerName}</td>
                                <td>{formatShortDate(item.CreatedDate)}</td>
                                <td>
                                    <UsersIconBtn onClickEvent={(e) => onClickBtn(e)} />
                                    <SearchIconBtn onClickEvent={(e) => onSearchBtnClick(e)}/>
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </Table>
        </div>
    )
}