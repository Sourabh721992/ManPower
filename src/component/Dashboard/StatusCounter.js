import React from "react";
import "../../Css/app.css";
import "react-phone-number-input/style.css";

export default function StatusCounter(props) {
    const mapStatusWithColor = { "Closed": "#96E2A1", "Flight": "#FF9190", "Resources": "#80A8FF", "VISA Stamp": "#F7D166", "Work Permit": "#C1A7FE" };
    let statusArr = [];
    if (props.detail) {
        statusArr = Object.keys(props.detail);
    }
    return (
        <div id="statusCounterContainer" className="statusCounterContainer">
            {
                statusArr.map((status, index) => (
                    <div key={"Status " + index} className="StatusCounterCard">
                        <div className="StatusCounterCount">
                            {props.detail[status]}
                        </div>
                        <div className="clr"></div>
                        <div className="StatusCounterLabel" style={{ backgroundColor: mapStatusWithColor[status] }}>{status}</div>
                    </div>
                ))
            }
        </div>
    )
}