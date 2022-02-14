import React from "react";
import { Form, InputGroup } from 'react-bootstrap'
import "../../../Css/app.css"

/* all props 
id (element id) -- mandatory
name (element name) -- mandatory
value (element selected option value) -- mandatory
addDefaultText (true or false) -- optional
valueColumn -- name of value column -- mandatory
textColumn -- name of text column -- mandatory
data -- complete array of options -- mandatory
defaultText - heading of default text -- optional
isDisabled - optional
*/

export default function Dropdown(props) {
  return (
    <InputGroup className="txtbgColor">
      <Form.Control aria-label="Default select example" className="DropdownDownArrow" as="select" size="sm" style={{ height: "20px", width: "100%" }}
        key={props.key}
        id={props.id + "-" + props.name}
        name={props.name}
        value={props.value ? props.value : props.addDefaultText ? "" : props.data.length > 0 ? props.data[0][props.valueColumn] : ""}
        disabled={props.disabled ? true : false}
        onChange={props.onChange}
        required={props.required}
      >
        {props.addDefaultText ? <option key={props.id + "_" + props.name + "__option_-1"} value="" > {props.defaultText ? props.defaultText : "Select"} </option> : null}
        {props.data.map((item, index) => (
          <option key={props.id + "_" + props.name + "__option" + index} value={item[props.valueColumn]}>{item[props.textColumn]}</option>
        ))}
      </Form.Control>
    </InputGroup>
  );
}