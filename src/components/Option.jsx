import React from "react";

import "./Option.css";

function Option(props) {
  return (
    <div className="main-wrapper" {...props}>
      {props.children}
    </div>
  );
}

export default Option;
