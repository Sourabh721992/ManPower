import React from "react";
import Alert from 'react-bootstrap/Alert'

export default function SuccessAlert(props) {
    if (props.show === true) {
        return (
            <Alert variant={props.variant}>
                {props.message}
            </Alert>
        );
    }
    else
        return null;
}