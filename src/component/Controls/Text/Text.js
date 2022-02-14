import React from "react";
import { Form, InputGroup } from 'react-bootstrap'
import "../../../Css/app.css";

export default function Text(props) {

    /* let feedback;
    if (props.required && !props.value) {
        feedback = <Form.Control.Feedback type="invalid">{props.errorMessage ? props.errorMessage : "Please Fill Detail"}</Form.Control.Feedback>
    } else {
        feedback = null;
    } */

    return (
        <>
            <InputGroup className="txtbgColor">
                <Form.Control
                    required={props.required}
                    key={props.id}
                    id={props.id}
                    className={props.className ? props.className : ''}
                    type={props.type}
                    value={props.value}
                    onChange={props.onChange}
                    name={props.name}
                    style={{ height: "30px", width: "100%" }}
                />
                {/*  {feedback} */}
            </InputGroup>
        </>
    );
}
