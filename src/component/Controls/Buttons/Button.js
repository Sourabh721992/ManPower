import React from "react";
import "../../../Css/app.css";

function Button(props) {
  return (
    <>
      <button className="btn button">{props.name}</button>
    </>
  );
}

export default Button;
