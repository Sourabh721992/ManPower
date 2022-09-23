import React, {Fragment} from "react";
import "../../Css/app.css";
import "react-phone-number-input/style.css";
import {Table, Card} from 'react-bootstrap'
import { encodeBase64, formatShortDate, getMoneyFormat, setItemToLocalStorage, /*logger*/ } from "../../utils/CommonList";
// import {SearchIconBtn, UsersIconBtn} from "../Controls/Buttons/IconButtons";
import { withRouter } from "react-router-dom";
import {DangerBadge, SuccessBadge, WarningBadge} from "../Controls/Badge/Badge"
import { RequirementStatus, Role } from "../../master-data";
import UserProfile from "../../utils/UserProfile";
import Remark from "../Worker/Remark";

function RequirementTable(props) {
    // // console.log(props.detail);

    const session = UserProfile.getSession()

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

    const displayRequirementStatus = (status) => {
        if(status){
            if(status === RequirementStatus.PENDING){
                return(
                    <DangerBadge badgeText={status}/>
                )
            }
            else if(status === RequirementStatus.PROCESSING){
                return(
                    <WarningBadge badgeText={status}/>
                )
            }
            else if(status === RequirementStatus.COMPLETED){
                return(
                    <SuccessBadge badgeText={status}/>
                )
            }
        }
        return "-"
    }

    const showRemark = (wCode) => {
        let requirementDataCopy = [...props.detail]

        requirementDataCopy.forEach(w => {
            if (w.Code === wCode) {
                w.showRemark = true
            }
        })

        // UPDATE PARENT
        if(props.UpdateParent){
            props.UpdateParent("update-requirements", requirementDataCopy)
        }

    }

    const closeRemark = () => {
        let requirementDataCopy = [...props.detail]

        requirementDataCopy.forEach(w => {
            w.showRemark = false
        })

        // UPDATE PARENT
        if(props.UpdateParent){
            props.UpdateParent("update-requirements", requirementDataCopy)
        }
    }

    return (
        <div className='my-3 mx-5 '>
            {
                props.detail && props.detail.length > 0 ?
                    <Table responsive striped borderless hover>
                        <thead className="text-center">
                            <tr>
                                <th>Code</th>
                                <th>No. of workers</th>
                                <th>Trade</th>
                                <th>Salary</th>
                                <th>Status</th>
                                <th>{session.Role === Role.Supplier ?
                                    "Buyer": "Supplier"
                                    }
                                </th>
                                <th>Remark</th>
                                <th>Created Date</th>
                                {/* <th>Action</th> */}
                            </tr>
                        </thead>
                        <tbody className="text-center">
                            {props.detail.map((item, index) => {
                                let Remarks = session.Role === Role.Supplier ? item.BuyerRemark : item.SupplierRemark
                                return (
                                    <tr className="align-middle" key={item.Code}> 
                                        <td>{
                                            <span
                                                className="text-primary"
                                                style={{ "cursor": "pointer" }}
                                                onClick={() => handleOnClick(item.Code, item.BuyerName, item.SupplierName)}
                                            >
                                                {
                                                    item.Code
                                                }
                                            </span>
                                        }
                                        </td>
                                        <td>
                                            {item.Trades.map((s, i) => {
                                                return (
                                                    <div key={"req_worker_cell_ " + i}><label>
                                                        {s.WorkerCount}
                                                    </label><br /></div>
                                                )
                                            })}
                                        </td>
                                        <td>{item.Trades.map((s, i) => {
                                            return (
                                                <div key={"req_trade_cell_ " + i}><label>
                                                    {s.Name}
                                                </label><br /></div>
                                            )
                                        })}</td>
                                        <td>{item.Trades.map((s, i) => {
                                            return (
                                                <div key={"req_sal_cell_ " + i}>
                                                    {
                                                        s.Currency && s.MinSalary && s.MinSalary > 0 && s.MaxSalary && s.MaxSalary > 0 ?
                                                            <span>
                                                                {getMoneyFormat(s.MinSalary, s.Currency)} -{getMoneyFormat(s.MaxSalary, s.Currency)}
                                                            </span>
                                                            : <span>Not Disclosed</span>
                                                    }

                                                    <br /></div>
                                            )
                                        })}</td>
                                        <td>{displayRequirementStatus(item.Status)}</td>
                                        <td>{session.Role === Role.Supplier ?
                                                item.BuyerName
                                                : item.SupplierName
                                            }
                                        </td>
                                        <td style={{ "whiteSpace": "normal", "wordBreak": "break-word", "maxWidth": "160px" }}>
                                            {
                                                Remarks ?
                                                    // <LinkButton onClickEvent={() => showRemark(item.Code)} 
                                                    // text={Remarks.length > 40 ?
                                                    //     Remarks.slice(0, 40) + "..."
                                                    //     : Remarks} className="p-0"/>
                                                    <Fragment>


                                                        <span
                                                            className="text-primary"
                                                            style={{ "cursor": "pointer" }}
                                                            onClick={() => showRemark(item.Code)}
                                                        >
                                                            {
                                                                Remarks.length > 40 ?
                                                                    Remarks.slice(0, 40) + "..."
                                                                    : Remarks
                                                            }
                                                        </span>
                                                        {/* - REMARKS */}
                                                        <Remark 
                                                            show={item.showRemark}
                                                            source="RequirementRemarks"
                                                            closeRemark={closeRemark} 
                                                            requirementCode={item.Code} 
                                                            // workerCode={item.Code} 
                                                            SellerRemarks={item.SupplierRemark} 
                                                            BuyerRemarks={item.BuyerRemark} />
                                                    </Fragment>
                                                    :
                                                    '-'
                                            }
                                        </td>
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
                    :
                    
                    <Card className='shadow-sm mt-4'>
                        <Card.Body className='d-flex justify-content-center align-items-center text-muted'>
                        {
                            session.Role === Role.Supplier ?
                                "No Assigned Requirement Found"
                                : "No Requirement Found. Add New Requirement."
                        }
                        </Card.Body>
                    </Card>
            }
            
        </div>
    )
}

export default withRouter(RequirementTable)