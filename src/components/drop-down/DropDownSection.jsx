import React from "react"
import DropDownTitle from "./DropDownTitle";

const DropDownSection = ({title, icon, text}) => {
  return (
    <div className="w-full h-fit flex flex-col section__process__row-gap__title-text">
        <DropDownTitle title={title}/>
    </div>
  );
};

export default DropDownSection;