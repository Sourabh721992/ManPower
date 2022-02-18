/* import React from 'react'
import { Row, Table } from 'react-bootstrap'
import { SearchIconBtn, UsersIconBtn } from '../Buttons/IconButtons'

export default function TableComponent(props) {

    const columns = props.columns
    const rowData = props.data

    return (
        <Table responsive striped borderless>
            <thead className="text-center">
                <tr>
                    {
                        columns.map((item) => {
                            return (
                                <th>{item}</th>
                            )
                        })
                    }
                </tr>
            </thead>
            <tbody className="text-center">
                {rowData.map((item, index) => {
                    return (
                        <tr key={"requirement_table_index_" + index}>

                            {
                                columns.map((c) => {

                                    if(item.column === c){
                                        if(item.type === "jsx_component"){
                                            React.createElement(
                                                <Row></Row>
                                            )
                                        }
                                    }
                                    return (
                                        <td>{item}</td>
                                    )
                                })
                            }

                             <td>{item.Code}</td>
                            <td>{item.WorkersCount}</td>
                            <td>{item.Trades.map((s, i) => {
                                return (
                                    <label key={"req_trade_cell_ " + i}>
                                        {s.Name}
                                    </label>
                                )
                            })}</td>
                            <td>{item.Trades.map((s, i) => {
                                return (
                                    <span key={"req_sal_cell_ " + i}>
                                        {getMoneyFormat(s.MaxSalary, s.Currency)}-{getMoneyFormat(s.MinSalary, s.Currency)}
                                    </span>
                                )
                            })}</td>
                            <td>{item.Status}</td>
                            <td>{item.BuyerName}</td>
                            <td>{formatShortDate(item.CreatedDate)}</td>
                            <td>
                                <UsersIconBtn onClickEvent={(e) => onClickBtn(e)} />
                                <SearchIconBtn onClickEvent={(e) => onSearchBtnClick(e)} />
                            </td> 
                        </tr>
                    )
                })}
            </tbody>
        </Table>
    )
}
 */