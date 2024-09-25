"use client";

import {
  animateEnter,
  BlackSquareAnimObject,
  play,
} from "@/app/scripts/animations/black-squares";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import React, { useEffect } from "react";

/**
 *
 * This is a React-wrapper for an animation described in {@link animateEnter}
 *
 * It requires parameters described below to run. There are no default values set.
 *
 * As soon as this component mounts to the document the animation will start playing.
 * You can optionally wrap animated component in this animation-wrapper, but it is optional. The animation requires
 * unique element id to start playing.
 *
 * But since it visually makes sense if the animation wrapper wraps the animated component, I left this feature in.
 *
 * @param {Number} rows - number of rows of the rectangles on canvas
 * @param {Number} cols - number of columns of the rectangles on canvas
 * @param {String} color - A string value of the color of the reactangles. Use any color representation you like, make sure it is supported by HTML
 * @param {String} elementId - Id of the animated element. Must be unique on the page
 * @param {Number} time - time of the animation in milliseconds
 * @returns
 */
const BlackSquare = (props) => {
  const { rows, cols, color, elementId, time } = props;
  let elementToAnim;

  useEffect(() => {
    elementToAnim = document.getElementById(elementId);
  }, [rows, cols, color, elementId]); // Depend on the props

  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger);

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: elementToAnim,
        start: "bottom bottom",
        // markers: true,
        onEnter: () => {
          console.log("ABOUT TO START");
          new BlackSquareAnimObject(
            cols,
            rows,
            time,
            color,
            elementToAnim,
            elementId
          );
        },
      },
    });
  });

  return <>{props.children}</>;
};

export default BlackSquare;
