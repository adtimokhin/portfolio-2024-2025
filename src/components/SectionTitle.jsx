"use client";

import React from "react";
import BlackSquare from "./animation/BlackSquare";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";

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
      });
    });

    // cleanup
    return () => ctx.revert(); // <-- CLEANUP!
  });

  return (
    <div
      className="w-full border-b border-text_light dark:border-text_dark flex flex-row relative h-[30px] items-center"
      id={`title-${sup}__main-container`}
    >
      <p id={`title-${title}__side-decor`}>
        <sub className="side-decoration">{side}</sub>
      </p>
      <h3 className="w-fit section-title-text absolute left-1/2 -translate-x-1/2 overflow-hidden">
        <span id={`title-${sup}__main`} className="inline-block relative">
          {title}
          <sup>{sup}</sup>
        </span>
      </h3>
    </div>
  );
};

export default SectionTitle;
