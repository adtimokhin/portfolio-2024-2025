"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import React from "react";

const ProjectCard = ({ imgDest, imgAlt, title }) => {
  useGSAP(() => {
    let ctx = gsap.context(() => {
      gsap.registerPlugin(ScrollTrigger);

      const span = document.getElementById(`project-text__${title}`);
      const container = document.getElementById(`project-text__container__${title}`);

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: "bottom 80%",
          duration: 0.8,
          ease: "power3.inOut",
        },
      });

      tl.from(span, {
        y: "100%",
      });
    });

    // cleanup
    return () => ctx.revert(); // <-- CLEANUP!
  });

  return (
    <div className="flex flex-1 flex-col section__projects__row-gap__title-image">
      {/* TODO: Set the height correctly */}
      <div className="w-full h-[470px] bg-lime-500">img</div>
      <p className="body-text overflow-hidden" id={`project-text__container__${title}`}>
        <span className="inline-block relative" id={`project-text__${title}`}>{title}</span>
      </p>
    </div>
  );
};

export default ProjectCard;
