"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import React, { useEffect, useRef, useState } from "react";
import Open from "../icons/actions/Open";
import Nothing from "../icons/actions/Nothing";
import Close from "../icons/actions/Close";

const DropDownTitle = ({
  title,
  icon,
  elementId,
  setSectionSelected,
  deselectSection,
}) => {
  //FIXME: onClick() causes problems! If you look, you see that there are two useState updates
  // there. Well, they are conflicting, I suppose. Some times the setSectionSelected() does not work

  const [selected, setSelected] = useState(false);
  const container = useRef();

  const { contextSafe } = useGSAP({ scope: container }); // we can pass in a

  // Animations
  // Play this animation when someone hovers on the title that is not selected
  const unselectedMouseHover = contextSafe(() => {
    gsap.to(".number-icon", { rotateZ: "0" });
    // icon-holder
    gsap.to(".icon-holder", { x: 34 });
  });

  // Play this animation when someone hovers over a selected title
  const selectedMouseHover = contextSafe(() => {
    gsap.to(".number-icon", { rotateZ: "0" });
    gsap.to(".icon-holder", { x: 34 * 2 });
  });

  // Play this animation when someone leaves an unselected title
  const unselectedMouseLeave = contextSafe(() => {
    gsap.to(".number-icon", { rotateZ: "-45" });
    gsap.to(".icon-holder", { x: 0 });
  });

  // Play this animation when someone leaves a selected title
  const selectedMouseLeave = contextSafe(() => {
    gsap.to(".number-icon", { rotateZ: "45" });
    gsap.to(".icon-holder", { x: "75%" });
  });

  const iconSelected = contextSafe(() => {
    gsap.to(".icon-holder", { x: "50%" });
  });

  const iconDeselected = contextSafe(() => {
    gsap.to(".icon-holder", { x: "25%" });
  });

  useEffect(() => {
    const titleItem = document.getElementById(elementId);

    const handleMouseEnter = () => {
      if (selected) {
        selectedMouseHover();
      } else {
        unselectedMouseHover();
      }
    };

    const handleMouseLeave = () => {
      if (selected) {
        selectedMouseLeave();
      } else {
        unselectedMouseLeave();
      }
    };

    titleItem.addEventListener("mouseenter", handleMouseEnter);
    titleItem.addEventListener("mouseleave", handleMouseLeave);

    // Clean up the event listeners on unmount
    return () => {
      titleItem.removeEventListener("mouseenter", handleMouseEnter);
      titleItem.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [selected]); // Re-run useEffect when `selected` changes

  return (
    <div
      className="flex flex-row items-center justify-start gap-x-8 hover:cursor-pointer"
      id={elementId}
      ref={container}
      onClick={() => {
        if (selected) {
          iconDeselected();
          deselectSection();
          setSelected(false);
        } else {
          iconSelected();
          setSectionSelected();
          setSelected(true);
        }

        console.log(selected);
      }}
    >
      <div className="desktop:w-[55px] tablet:w-[38px] phone:w-[36px] desktop:h-[55px] tablet:h-[38px] phone:h-[36px] flex flex-col justify-center items-center">
        <div className="number-icon -rotate-45">{icon}</div>
      </div>

      
      <h4 className="large-title-text">{title}</h4>

      <div className="desktop:w-[34px] tablet:w-[19px] phone:w-[17px] h-[61px] relative overflow-hidden">
        <div className="absolute right-0 top-0 deskotp:h-[61px] tablet:h-[34px] phone:h-[34px] desktop:w-[136px] tablet:w-[76px] phone:w-[68px] icon-holder">
          <div className="w-full flex flex-row gap-0">
            <Nothing />
            <Open />
            <Close />
            <Nothing />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DropDownTitle;
