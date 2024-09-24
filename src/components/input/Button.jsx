import React from "react"
import "@/app/styles/components/button.sass"

const Button = ({text}) => {
  return (
    <button className="inverted">
        <p className="large-title-text">{text}</p>
    </button>
  );
};

export default Button;