import React from "react";
import "../../Css/app.css";
import { Row, Col } from "react-bootstrap";
import "react-phone-number-input/style.css";
// import UserProfile from "../../utils/UserProfile";
import { AiTwotoneDelete } from "react-icons/ai";
import { IconContext } from "react-icons";

export default function SupplierList(props) {

    const onClickDeleteSupplier = (supplierId) => {
        let text = "Are you Sure ? you want to delete this item";
        if (window.confirm(text) === true) {
            props.DeleteApi(supplierId);
        }
    }

    return (
        <>
            <h5 className="RequireDetlHead">{"Total Supplier Count : " + props.data.length}</h5>
            <div className="fl w100pc">
                {props.data.map((item, index) => (
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
                            <Col sm={7}>
                                <div className="fs15px fl mt5px fw500">Requirement Cleared :&nbsp;</div>
                                <div className="fs15px fl mt5px fw500" style={{ color: "#4361A1" }}>{item.RequirementCleared}</div>
                                <div className="clr"></div>
                                <div className="fs15px fl mt5px fw500">Total Workers Provided :&nbsp;</div>
                                <div className="fs15px fl mt5px fw500" style={{ color: "#4361A1" }}>{item.TotalWorkersProvided}</div>
                                <div className="clr"></div>
                                <div className="fs15px fl mt5px fw500">Last Engagement :&nbsp;</div>
                                <div className="fs15px fl mt5px fw500" style={{ color: "#4361A1" }}>{item.LastEngagement}</div>
                            </Col>
                            <Col sm={4}>
                                {/* <div className="fl">
                                    <div className="fl" style={{ width: "30px" }}>
                                        <IconContext.Provider value={{ color: "#4361A1", size: "1.8em" }} >
                                            <div>
                                                <AiFillEdit />
                                            </div>
                                        </IconContext.Provider>
                                    </div>
                                    <div className="fs15px fl mt5px fw500" style={{ color: "#4361A1", width: "20px" }}>Edit</div>
                                </div>
                                <div className="clr"></div> */}
                                <div className="fl mt20px cupointer" onClick={() => onClickDeleteSupplier(item.Id)}>
                                    <div className="fl" style={{ width: "30px" }}>
                                        <IconContext.Provider value={{ color: "#F3464C", size: "1.8em" }} >
                                            <div>
                                                <AiTwotoneDelete />
                                            </div>
                                        </IconContext.Provider>
                                    </div>
                                    <div className="fs15px fl mt5px fw500" style={{ color: "#F3464C", width: "20px" }}>Delete</div>
                                </div>
                            </Col>
                        </Row>
                    </div>
                ))
                }
            </div>
        </>
    )
}