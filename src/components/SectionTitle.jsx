"use client";

import React from "react";
import BlackSquare from "./animation/BlackSquare";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";
import HoverAnimation from "./animation/HoverAnimation";

/**
 *
 * Used to display the title of the section that is viewed.
 *
 * @param {String} side - side text
 * @param {String} title - title of the section
 * @param {String} sup - suptext of the title of the section
 * @returns
 */
const SectionTitle = ({ side, title, sup }) => {
  useGSAP(() => {
    let ctx = gsap.context(() => {
      gsap.registerPlugin(ScrollTrigger);

      const title = document.getElementById(`title-${sup}__main`);
      const container = document.getElementById(`title-${sup}__main-container`);
      const line = container.getElementsByClassName("expand-line");

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: "bottom 80%",
          duration: 0.8,
          ease: "power3.inOut",
        },
      });

      tl.from(title, {
        y: "100%",
        opacity:0.3
      });

      gsap.from(line, {
        width: "0%",
        scrollTrigger: {
          trigger: container,
          start: "bottom 80%",
          duration: 1.2,
          ease: "power4.inOut",
        },
      });
    });

    // cleanup
    return () => ctx.revert(); // <-- CLEANUP!
  });

  return (
    <div
      className="w-full flex flex-col relative h-[30px] items-center"
      id={`title-${sup}__main-container`}
    >
      <div className="w-full flex flex-row relative h-[30px] items-center">
        <p id={`title-${title}__side-decor`}>
          <sub className="side-decoration">{side}</sub>
        </p>
        <h2 className="w-fit section-title-text absolute left-1/2 -translate-x-1/2 overflow-hidden">
          <HoverAnimation>
            <span id={`title-${sup}__main`} className="inline-block relative">
              {title}
              <sup>{sup}</sup>
            </span>
          </HoverAnimation>
        </h2>
      </div>
      <div className="w-full bg-text_light dark:text-text_dark h-[1px] expand-line" />
    </div>
  );
};

export default SectionTitle;
