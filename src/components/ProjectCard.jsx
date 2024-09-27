"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import React, { useEffect } from "react";

const ProjectCard = ({ imgDest, imgAlt, title, destination }) => {
  let span;
  let container;
  let card;

  useEffect(() => {
    // hover-event listener
    span = document.getElementById(`project-text__${title}`);
    container = document.getElementById(`project-text__container__${title}`);
    card = document.getElementById(`project-text__card__${title}`);

    // card.addEventListener("mouseover", () => {

    //   const cursor = document.getElementById("custom-cursor");
    //   cursor.style.visibility = "visible";
    // });
  }, []);

  useGSAP(() => {
    let ctx = gsap.context(() => {
      gsap.registerPlugin(ScrollTrigger);
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
    <a
      className="flex flex-1 flex-col section__projects__row-gap__title-image"
      id={`project-text__card__${title}`}
      href={destination}
      target="_blank"
    >
      {/* TODO: Set the height correctly */}
      <div className="w-full h-[470px] bg-lime-500">img</div>
      <p
        className="body-text overflow-hidden"
        id={`project-text__container__${title}`}
      >
        <span className="inline-block relative" id={`project-text__${title}`}>
          {title}
        </span>
      </p>
    </a>
  );
};

export default ProjectCard;
