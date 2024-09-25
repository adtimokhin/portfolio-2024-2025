"use client";

import { animateEnter, play } from "@/app/scripts/animations/black-squares";
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
  useEffect(() => {
    // This code only runs on the client-side
    const elementToAnim = document.getElementById(elementId);
    if (elementToAnim) {
      animateEnter(rows, cols, color, time, elementToAnim, elementId);

      // playing animation after a delay. Just testing
      setTimeout(() => {
        play();
      }, 3000);
    }
  }, [rows, cols, color, elementId]); // Depend on the props

  return <>{props.children}</>;
};

export default BlackSquare;
