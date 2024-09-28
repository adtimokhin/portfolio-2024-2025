"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import Image from "next/image";
import React, { useEffect, useRef } from "react";
import test from "@/app/images/Test.png";

const ProjectCard = ({ imgDest, imgAlt, title, destination }) => {
  let span;
  let text;
  let card;
  let cursor;

  let cursorWidth = 10;
  let cursorHeight = 10;

  const containerRef = useRef(null);
  const gsapRef = useRef(null);

  // Animation when element gets into the view
  // FIXME: Animation of the text does not happen on the scroll.
  useGSAP(
    () => {
      let ctx = gsap.context(() => {
        gsap.registerPlugin(ScrollTrigger);
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: "a",
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
    },
    { scope: gsapRef }
  );

  const { contextSafe } = useGSAP({ scope: containerRef }); // we can pass in a

  // Making an animation for the cursor

  function findCustomCursors(container) {
    const cursors = container.querySelectorAll(".custom-cursor");
    return cursors; // This returns a NodeList of elements
  }

  const addCursor = contextSafe((container, event) => {
    console.log("Adding cursor");

    cursor = document.createElement("div");
    cursor.style.position = "absolute";
    cursor.classList.add("custom-cursor"); // Add your custom class

    const x = event.clientY - cursorHeight + window.scrollY;
    const y = event.clientX - cursorWidth;

    cursor.style.top = `${x}px`;
    cursor.style.left = `${y}px`;
    cursor.style.zIndex = "9999";
    cursor.style.width = `${2 * cursorWidth}px`; // Customize the size
    cursor.style.height = `${2 * cursorHeight}px`; // Customize the size
    cursor.style.backgroundColor = "rgba(255, 0, 0, 0)"; // Customize the color
    cursor.style.mixBlendMode = "exclusion";
    cursor.style.borderRadius = "50%"; // Make it circular
    cursor.style.pointerEvents = "none"; // Prevent it from interfering with mouse events

    // Addpending text to the cursor
    text = document.createElement("p");
    text.style.width = "400px"; // Does not really matter
    text.style.height = "400px"; // Does not really matter
    text.style.color = "black"; // Until this is "white", it will be invisible
    text.style.mixBlendMode = "exclusion";
    text.classList.add("large-text");
    text.textContent = "OPEN ↗";

    cursor.appendChild(text);
    container.appendChild(cursor);

    gsap.to(text, { color: "white" });
  });

  const moveCursor = contextSafe((top, left) => {
    gsap.to(cursor, {
      top: `${top}px`,
      left: `${left}px`,
      duration: 0.2,
      delay: 0.02,
    });
  });

  const removeCursor = contextSafe(() => {
    gsap.to(text, {
      color: "black",
      onComplete: () => {
        cursor.remove();
      },
    });
  });

  const animateImage = contextSafe(() => {
    gsap.from("img", { opacity: 0, duration: 0.3, ease: "power1.inOut" });
  });

  useEffect(() => {
    // hover-event listener
    span = document.getElementById(`project-text__${title}`);
    card = document.getElementById(`project-text__card__${title}`);

    card.addEventListener("mouseenter", (event) => {
      const customCursors = findCustomCursors(card);
      if (customCursors.length === 0) {
        console.log("No custom cursors found.");
        addCursor(card, event); // Cursor is set

        // Adding the event listener
        card.addEventListener("mousemove", (e) => {
          const x = e.clientY - cursorHeight + window.scrollY;
          const y = e.clientX - cursorWidth;
          moveCursor(x, y);
        });
      }
    });

    card.addEventListener("mouseleave", () => {
      const customCursors = findCustomCursors(card);
      if (customCursors.length === 0) {
        console.log("No cursors");
        return;
      }

      customCursors.forEach((cursor) => {
        // Before removing the cursor, play the fade animation for the text
        removeCursor();
      });

      card.removeEventListener("mousemove", moveCursor);
    });
  }, []);

  return (
    <div
      ref={gsapRef}
      className="flex flex-1 flex-col section__projects__row-gap__title-image"
    >
      <a
        className="flex flex-1 flex-col section__projects__row-gap__title-image"
        id={`project-text__card__${title}`}
        href={destination}
        target="_blank"
        ref={containerRef}
      >
        {/* TODO: Set the height correctly */}
        <div className="w-full h-[470px] inverted flex flex-col items-center justify-center relative">
          <p className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 body-text w-fit text-center">
            [IMG LOADING...]
          </p>
          <Image
            height={470}
            src={test}
            style={{ maxHeight: "100%", width: "100%" }}
            className="z-10"
            onLoadingComplete={animateImage}
          />
        </div>
        <p
          className="body-text overflow-hidden"
          id={`project-text__container__${title}`}
        >
          <span className="inline-block relative" id={`project-text__${title}`}>
            {title}
          </span>
        </p>
      </a>
    </div>
  );
};

export default ProjectCard;
