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

export default FilterButton;
