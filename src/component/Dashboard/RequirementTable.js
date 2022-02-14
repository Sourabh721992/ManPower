import React from "react";
import "../../Css/app.css";
import "react-phone-number-input/style.css";
import Table from 'react-bootstrap/Table'
import { AiOutlineSearch } from "react-icons/ai";
import { IconContext } from "react-icons";

export default function RequirementTable(props) {
    console.log(props.detail);

    // let trades = "";
    // let salary = "";
    // let Requirements = [];

    /* if (props.detail.length > 0) {
        Requirements = JSON.parse(JSON.stringify(props.detail));
        Requirements = Requirements.map((item) => {
            let Trades = ""
            let Salary = "";
            let WorkersCount = "";
            for (var itemTrade of item.Trades) {
                Trades += (!itemTrade.Name ? "" : itemTrade.Name) + "\n";
                Salary += itemTrade.MinSalary + " - " + itemTrade.MaxSalary + "\n";
                WorkersCount += itemTrade.WorkerCount + "\n";
            }
            item.Trade = Trades;
            item.Salary = Salary;
            item.WorkersCount = WorkersCount;
            return item;
        })
    } */

    return (
        <div id="RequirementTable" className="RequirementTable DashboardTableSpacing">
            <Table responsive striped bordered hover>
                <thead>
                    <tr>
                        <th>Code</th>
                        <th>Trade</th>
                        <th>No. of Workers</th>
                        <th>Salary</th>
                        <th>Status</th>
                        <th>Supplier</th>
                        <th>Create Date</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {props.detail.map((item, index) => (

                        <tr key={"tableRow" + index}>
                            <td>{item.Code}</td>
                            <td>{item.Trades.map((s, index) => (
                                <React.Fragment key={"ReqTradeCell " + index}>
                                    {s.Name}
                                    <br />
                                </React.Fragment>
                            ))}</td>
                            <td>{item.Trades.map((s, index) => (
                                <React.Fragment key={"ReqTradeCell " + index}>
                                    {s.WorkerCount}
                                    <br />
                                </React.Fragment>
                            ))}</td>
                            <td>{item.Trades.map((s, index) => (
                                <React.Fragment key={"ReqTradeCell " + index}>
                                    {s.Currency + " " + s.MinSalary + " - " + s.MaxSalary}
                                    <br />
                                </React.Fragment>
                            ))}</td>
                            <td style={{ color: item.Status === "Completed" ? "#02A81A" : "" }}>{item.Status}</td>
                            <td>{item.Supplier}</td>
                            <td>{item["CreatedDate"].split("T")[0]}</td>
                            <td>
                                <IconContext.Provider value={{ color: "#3860C7", size: "1.4em" }} >
                                    <div>
                                        <AiOutlineSearch />
                                    </div>
                                </IconContext.Provider>
                            </td>
                        </tr>
                    ))
                    }
                </tbody>
            </Table>
        </div>
    )
}