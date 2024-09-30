import React from "react";

const Invert = ({classes}) => {
  return (
    <svg
      viewBox="0 0 15 15"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`${classes} invert__icon`}
    >
      <circle cx="7.5" cy="7.5" r="7.5" fill="#1C1C1C" />
    </svg>
  );
};

export default Invert;
