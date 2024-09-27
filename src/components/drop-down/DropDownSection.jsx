"use client";
import React, { useState } from "react";
import DropDownTitle from "./DropDownTitle";

import One from "../icons/numbers/One";
import Two from "../icons/numbers/Two";
import Three from "../icons/numbers/Three";
import Four from "../icons/numbers/Four";
import Five from "../icons/numbers/Five";

const DropDownSection = ({
  title,
  text,
  elementNumber,
  setSectionSelected,
  deselectSection,
}) => {
  const numberIconDict = {
    1: <One />,
    2: <Two />,
    3: <Three />,
    4: <Four />,
    5: <Five />,
  };

  return (
    <div className="w-full h-fit flex flex-col section__process__row-gap__title-text">
      <DropDownTitle
        title={title}
        icon={numberIconDict[elementNumber]}
        key={`process__title-${elementNumber}`}
        elementId={`process__title-${elementNumber}`}
        setSectionSelected={setSectionSelected}
        deselectSection={deselectSection}
      />

      {text}
    </div>
  );
};

export default DropDownSection;
