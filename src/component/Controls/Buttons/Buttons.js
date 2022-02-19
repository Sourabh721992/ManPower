import React from "react";
import { Button } from "react-bootstrap";
import { FiFilter } from "react-icons/fi";
import "../../../Css/app.css";

function FilterButton(props) {
  return (
    <Button variant="light">
      <FiFilter /> Filter 
    </Button>
  );
}

function PrimaryButton(props) {
  return (
    <Button disabled={props.disabled} variant="primary" onClick={props.onClickEvent}>
      {props.text} 
    </Button>
  );
}

function LightButton(props) {
  return (
    <Button disabled={props.disabled} variant="light" onClick={props.onClickEvent}>
      {props.text} 
    </Button>
  );
}

function OutlinePrimaryButton(props) {
  return (
    <Button className={props.className} disabled={props.disabled} variant="outline-primary" onClick={props.onClickEvent}>
      {props.text} 
    </Button>
  );
}

export {
  FilterButton, PrimaryButton, LightButton, OutlinePrimaryButton
}
