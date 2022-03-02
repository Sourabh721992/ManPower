import React from "react";
import { Button } from "react-bootstrap";
import { FiFilter } from "react-icons/fi";
import "../../../Css/app.css";

function FilterButton(props) {
  return (
    <Button variant="light" onClick={props.onClickEvent}>
      <FiFilter /> Filter 
    </Button>
  );
}

function MpButton(props) {
  return (
    <Button type={props.btnType} variant={props.variant} onClick={props.onClickEvent}>
      {props.label}
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

function SuccessButton(props) {
  return (
    <Button disabled={props.disabled} variant="success" onClick={props.onClickEvent}>
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

function LinkButton(props) {
  return (
    <Button className={props.className} disabled={props.disabled} variant="link" onClick={props.onClickEvent}>
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
  FilterButton, PrimaryButton, LightButton, OutlinePrimaryButton, MpButton, LinkButton, SuccessButton
}
