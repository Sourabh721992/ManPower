import React from "react";
import Form from 'react-bootstrap/Form'

export default function Label(props) {
  return (
    <Form.Label id={props.id} className={props.className ? props.className : ''}>
      {props.value}
    </Form.Label>
  );
}
