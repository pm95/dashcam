import React from "react";

import "./styles/Option.css";

function Option(props) {
  return (
    <div className="main-wrapper" {...props}>
      {props.children}
    </div>
  );
}

export default Option;
