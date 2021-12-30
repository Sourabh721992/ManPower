import React from "react";
import "../../../Css/app.css";

function Button(props) {
  return (
    <>
      <button type="submit" className="button">
        {props.name}
      </button>
    </>
  );
}

export default Button
