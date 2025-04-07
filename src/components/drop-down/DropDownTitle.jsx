"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
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
  const gsapRef = useRef(); // Ref for the entire component for ScrollTrigger

  const { contextSafe } = useGSAP({ scope: container });

  // Register ScrollTrigger plugin and set up scroll-based animation
  useGSAP(() => {
    // Register ScrollTrigger plugin
    gsap.registerPlugin(ScrollTrigger);
    
    // Get the title element and number icon
    const titleElement = gsapRef.current.querySelector(".title-text-container h4");
    const numberIcon = gsapRef.current.querySelector(".number-icon-wrapper");
    
    // Create a timeline for the scroll animation
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: gsapRef.current,
        start: "top 80%", // Start when top of element reaches 80% from top of viewport
        toggleActions: "play none none none", // Play on enter, reverse on leave
        markers: false, // Set to true for debugging
      }
    });
    
    // Add animation to the timeline - stagger the animations slightly
    tl.from(numberIcon, {
      y: "150%", // Start from below
      duration: 0.7,
      ease: "power3.out",
      delay: 0.1 * (parseInt(elementId.replace(/[^0-9]/g, '')) || 0), // Stagger based on ID
    }).from(titleElement, {
      y: "100%", // Start from below
      duration: 0.7,
      ease: "power3.out",
    }, "-=0.5"); // Start slightly before the previous animation finishes
    
    // Initial icon state for action icons
    gsap.set(".icon-holder", { x: 0 });
    
    // Return cleanup function
    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, { scope: gsapRef, dependencies: [elementId] });

  // Animations
  // Play this animation when someone hovers on the title that is not selected
  const unselectedMouseHover = contextSafe(() => {
    const numberIcon = container.current.querySelector(".number-icon");
    const iconHolder = container.current.querySelector(".icon-holder");
    
    gsap.to(numberIcon, { rotateZ: "0" });
    // icon-holder
    gsap.to(iconHolder, { x: 34 });
  });

  // Play this animation when someone hovers over a selected title
  const selectedMouseHover = contextSafe(() => {
    const numberIcon = container.current.querySelector(".number-icon");
    const iconHolder = container.current.querySelector(".icon-holder");
    
    gsap.to(numberIcon, { rotateZ: "0" });
    gsap.to(iconHolder, { x: 34 * 2 });
  });

  // Play this animation when someone leaves an unselected title
  const unselectedMouseLeave = contextSafe(() => {
    const numberIcon = container.current.querySelector(".number-icon");
    const iconHolder = container.current.querySelector(".icon-holder");
    
    gsap.to(numberIcon, { rotateZ: "-45" });
    gsap.to(iconHolder, { x: 0 });
  });

  // Play this animation when someone leaves a selected title
  const selectedMouseLeave = contextSafe(() => {
    const numberIcon = container.current.querySelector(".number-icon");
    const iconHolder = container.current.querySelector(".icon-holder");
    
    gsap.to(numberIcon, { rotateZ: "45" });
    gsap.to(iconHolder, { x: "75%" });
  });

  const iconSelected = contextSafe(() => {
    const iconHolder = container.current.querySelector(".icon-holder");
    gsap.to(iconHolder, { x: "50%" });
  });

  const iconDeselected = contextSafe(() => {
    const iconHolder = container.current.querySelector(".icon-holder");
    gsap.to(iconHolder, { x: "25%" });
  });

  const handleClick = () => {
    // Using a single function to handle all state updates together
    if (selected) {
      iconDeselected();
      deselectSection();
      setSelected(false);
    } else {
      iconSelected();
      setSectionSelected();
      setSelected(true);
    }
  };

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

    if (titleItem) {
      titleItem.addEventListener("mouseenter", handleMouseEnter);
      titleItem.addEventListener("mouseleave", handleMouseLeave);

      // Clean up the event listeners on unmount
      return () => {
        titleItem.removeEventListener("mouseenter", handleMouseEnter);
        titleItem.removeEventListener("mouseleave", handleMouseLeave);
      };
    }
  }, [selected, elementId, selectedMouseHover, selectedMouseLeave, unselectedMouseHover, unselectedMouseLeave]);

  return (
    <div
      className="flex flex-row items-center justify-start gap-x-8 hover:cursor-pointer"
      id={elementId}
      ref={el => {
        container.current = el;
        gsapRef.current = el; // Assign both refs to the same element
      }}
      onClick={handleClick}
    >
      {/* Number icon with overflow mask for animation */}
      <div className="desktop:w-[55px] tablet:w-[38px] phone:w-[36px] desktop:h-[55px] tablet:h-[38px] phone:h-[36px] flex flex-col justify-center items-center overflow-hidden">
        <div className="number-icon-wrapper">
          <div className="number-icon -rotate-45">{icon}</div>
        </div>
      </div>

      {/* Title text with overflow mask for animation */}
      <div className="overflow-hidden title-text-container">
        <h4 className="large-title-text">{title}</h4>
      </div>

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