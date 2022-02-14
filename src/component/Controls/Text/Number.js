import React from "react";
import Form from 'react-bootstrap/Form'

export default function Number(props) {
    return (
        <Form.Control min="1" required = "true" key={props.id} id={props.id} className={props.className ? props.className : ''} type={props.type} value={props.value} onChange={props.onChange} name={props.name} style={{ height: "30px" , width : "100%" }} />
    );
}
