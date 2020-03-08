import React from "react";
import "./ViewBtn.css";

// The ...props means, spread all of the passed props onto this element
// That way we don't have to define them all individually
function ViewBtn(props) {
  return (
    <a className="view-btn" {...props}>
      View Book
    </a>
  );
}

export default ViewBtn;
