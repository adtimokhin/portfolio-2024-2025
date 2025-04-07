"use client";
import React, { useRef } from "react";
import DropDownTitle from "./DropDownTitle";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

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
  
  const sectionRef = useRef(null);
  
  // Register ScrollTrigger and set up the line animation
  useGSAP(() => {
    // Register ScrollTrigger plugin
    gsap.registerPlugin(ScrollTrigger);
    
    // Get the line element
    const lineElement = sectionRef.current.querySelector(".anim-line");
    
    // Initially set the line to have 0 width
    gsap.set(lineElement, { 
      width: "0%", 
    });
    
    // Create a timeline for the scroll animation
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "bottom 90%", // Start when bottom of element reaches 90% from top of viewport
        toggleActions: "play none none none", // Play on enter, reverse on leave
        markers: false, // Set to true for debugging
      }
    });
    
    // Add animation to the timeline - line grows from left to right
    tl.to(lineElement, {
      width: "100%",
      duration: 0.8,
      ease: "power2.inOut",
      delay: 0.2 + (0.1 * elementNumber), // Delay based on element number for sequencing
    });
    
    // Return cleanup function
    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, { scope: sectionRef, dependencies: [elementNumber] });

  return (
    <div 
      className="w-full h-fit flex flex-col section__process__row-gap__title-text"
      ref={sectionRef}
    >
      <DropDownTitle
        title={title}
        icon={numberIconDict[elementNumber]}
        key={`process__title-${elementNumber}`}
        elementId={`process__title-${elementNumber}`}
        setSectionSelected={setSectionSelected}
        deselectSection={deselectSection}
      />

      {text}

      <div className="w-full bg-text_light dark:bg-text_dark h-[2px] anim-line origin-left"/>
    </div>
  );
};

export default DropDownSection;