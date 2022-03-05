import React, { Fragment } from 'react'
import { Col, Row } from 'react-bootstrap'
// import { MdDelete } from 'react-icons/md'
// import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'
import { RemoveBuyer } from '../../utils/ApiFunctions'
import { formatShortDate, logger } from '../../utils/CommonList'
import UserProfile from '../../utils/UserProfile'
import { DeleteIconBtn/* , EditIconBtn */ } from '../Controls/Buttons/IconButtons'

export default function BuyerList(props) {
    logger.log(props)

    const session = UserProfile.getSession()
    // const history = useHistory()

    const onDeleteBtn = (item) => {
        let data = {
            supplierId: session.UserId,
            buyerId: item.Id
        }

        RemoveBuyer(data)
        .then((resp) => {
            logger.log("deleted...")
            window.location.href = "/buyer"
        })
    }  

    return (
        // <Fragment>
        //     <Row>
        //         {
        //             props.buyerList.map((item) => {
        //                 return (
        //                     <Col key={"buyer-user-card-" + item.id} sm={4}>
        //                         <Card className="buyer-user-card">
        //                             <Card.Header className='d-flex justify-content-between'>
        //                                 <h6>{item.Name}</h6>
        //                                 <span>Added On - {formatShortDate(item.AddedOn)}</span>
        //                             </Card.Header>
        //                             <Card.Body>
        //                                 <Row>
        //                                     <Col sm={8}>
        //                                         <Row  className="ml-n2">
        //                                             <Col sm={12}>
        //                                                 <label className='m-2'>Requirement Cleared:</label>
        //                                                 <span style={{ color: "#4361A1", fontWeight:"bold" }}>{item.RequirementCleared}</span>
        //                                             </Col>
        //                                         </Row>
        //                                         <Row  className="ml-n2">
        //                                             <Col sm={12}>
        //                                                 <label className='m-2'>Total Workers Provided:</label>
        //                                                 <span style={{ color: "#4361A1", fontWeight:"bold" }}>{item.TotalWorkersProvided}</span>
        //                                             </Col>
        //                                         </Row>
        //                                         <Row  className="ml-n2">
        //                                             <Col sm={12}>
        //                                                 <label className='m-2'>Last Engagement:</label>
        //                                                 <span style={{ color: "#4361A1", fontWeight:"bold" }}>{formatShortDate(item.LastEngagement)}</span>
        //                                             </Col>
        //                                         </Row>
        //                                     </Col>
        //                                     <Col sm={4}>
        //                                         {/* <Col sm={12}>
        //                                             <EditIconBtn btnText="Edit"/>
        //                                         </Col> */}
        //                                         <Col sm={12}>
        //                                             <DeleteIconBtn btnText="Delete" onClickEvent={() => onDeleteBtn(item)}/>
        //                                         </Col>
                                                
        //                                     </Col>
        //                                 </Row>
        //                             </Card.Body>
        //                         </Card>
        //                      </Col> 
        //                 )
        //             })
        //         }
        //     </Row>

        // </Fragment>
        <>
            {/* <h5 className="RequireDetlHead">{"Total Buyer Count : " + props.buyerList.length}</h5> */}
            <div className="fl w100pc">
                {props.buyerList.map((item, index) => (
                    <div key={"SupplierList " + index} className="fl br5px mt30px" style={{ width: "30%", backgroundColor: "#E6EAF3", color: "#5A5D62", marginLeft: "2%" }}>
                        <Row className="mt10px">
                            <Col sm={1} style={{ width: "4%" }}></Col>
                            <Col sm={5}>
                                <div className="fs15px fl fwb">{item.Name + " - "}</div>
                                <div className="fs15px fl fsi fwb">{item.Id}</div>
                            </Col>
                            <Col sm={1}></Col>
                            <Col sm={5} style={{ marginLeft: "3%" }}>
                                <div className="fs15px fl fwb" style={{ fontSize: "12px" }}>{"Added on - " + item.AddedOn.split("T")[0]}</div>
                            </Col>
                        </Row>
                        <div className="clr"></div>
                        <div className="fl mt5px" style={{ backgroundColor: "#5A5D62", width: "96%", marginLeft: "2%", height: "1px" }}></div>
                        <Row className="mt20px mb10px">
                            <Col sm={1} style={{ width: "4%" }}></Col>
                            <Col sm={8}>
                                <div className="fs15px fl mt5px fw500">Requirement Cleared :&nbsp;</div>
                                <div className="fs15px fl mt5px fw500" style={{ color: "#4361A1" }}>{item.RequirementCleared}</div>
                                <div className="clr"></div>
                                <div className="fs15px fl mt5px fw500">Total Workers Provided :&nbsp;</div>
                                <div className="fs15px fl mt5px fw500" style={{ color: "#4361A1" }}>{item.TotalWorkersProvided}</div>
                                <div className="clr"></div>
                                <div className="fs15px fl mt5px fw500">Last Engagement :&nbsp;</div>
                                <div className="fs15px fl mt5px fw500" style={{ color: "#4361A1" }}>
                                    {formatShortDate(item.LastEngagement)}
                                </div>
                            </Col>
                            <Col sm={3}>
                                <DeleteIconBtn btnText="Delete" onClickEvent={() => onDeleteBtn(item)}/>
                            </Col>
                        </Row>
                    </div>
                ))
                }
            </div>
        </>
    )
}
