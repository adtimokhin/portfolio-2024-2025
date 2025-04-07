"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import React, { useEffect, useRef } from "react";

const ProjectCard = ({ imgName, imgAlt, title, destination }) => {
  // Use refs instead of let variables for better React practices
  const cursorRef = useRef(null);
  const textRef = useRef(null);
  const spanRef = useRef(null);
  const cardRef = useRef(null);

  const cursorWidth = 10;
  const cursorHeight = 10;

  const containerRef = useRef(null);
  const gsapRef = useRef(null);

  // Animation when element gets into the view
  useGSAP(
    () => {
      gsap.registerPlugin(ScrollTrigger);
      
      // Select elements within the proper ref scope
      const card = gsapRef.current.querySelector(".card");
      const jumpText = containerRef.current.querySelector("span");
      
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: card,
          start: "bottom 80%",
          duration: 0.8,
          ease: "power3.inOut",
        },
      });

      tl.from(jumpText, {
        y: "100%",
      });
      
      // Return cleanup function
      return () => {
        ScrollTrigger.getAll().forEach(t => t.kill());
      };
    },
    { scope: gsapRef }
  );

  const { contextSafe } = useGSAP({ scope: containerRef });

  // Making an animation for the cursor
  function findCustomCursors(container) {
    const cursors = container.querySelectorAll(".custom-cursor");
    return cursors; 
  }

  const addCursor = contextSafe((container, event) => {
    console.log("Adding cursor");

    const cursor = document.createElement("div");
    cursor.style.position = "absolute";
    cursor.classList.add("custom-cursor");

    const x = event.clientY - cursorHeight + window.scrollY;
    const y = event.clientX - cursorWidth;

    cursor.style.top = `${x}px`;
    cursor.style.left = `${y}px`;
    cursor.style.zIndex = "9999";
    cursor.style.width = `${2 * cursorWidth}px`;
    cursor.style.height = `${2 * cursorHeight}px`;
    cursor.style.backgroundColor = "rgba(255, 0, 0, 0)";
    cursor.style.mixBlendMode = "exclusion";
    cursor.style.borderRadius = "50%";
    cursor.style.pointerEvents = "none";

    // Appending text to the cursor
    const text = document.createElement("p");
    text.style.width = "400px";
    text.style.height = "400px";
    text.style.color = "black";
    text.style.mixBlendMode = "exclusion";
    text.classList.add("large-text");
    text.textContent = "OPEN ↗";

    cursor.appendChild(text);
    container.appendChild(cursor);
    
    // Store references
    cursorRef.current = cursor;
    textRef.current = text;

    gsap.to(text, { color: "white" });
  });

  const moveCursor = contextSafe((top, left) => {
    if (cursorRef.current) {
      gsap.to(cursorRef.current, {
        top: `${top}px`,
        left: `${left}px`,
        duration: 0.2,
        delay: 0.02,
      });
    }
  });

  const removeCursor = contextSafe(() => {
    if (textRef.current && cursorRef.current) {
      gsap.to(textRef.current, {
        color: "black",
        onComplete: () => {
          if (cursorRef.current) {
            cursorRef.current.remove();
            cursorRef.current = null;
          }
        },
      });
    }
  });

  const animateImage = contextSafe(() => {
    gsap.from(containerRef.current.querySelector("img"), { 
      opacity: 0, 
      duration: 0.3, 
      ease: "power1.inOut" 
    });
  });

  const handleMouseMove = (e) => {
    const x = e.clientY - cursorHeight + window.scrollY;
    const y = e.clientX - cursorWidth;
    moveCursor(x, y);
  };

  useEffect(() => {
    // Store references to DOM elements after they're mounted
    spanRef.current = document.getElementById(`project-text__${title}`);
    cardRef.current = document.getElementById(`project-text__card__${title}`);

    if (cardRef.current) {
      // Mouse enter event
      const handleMouseEnter = (event) => {
        const customCursors = findCustomCursors(cardRef.current);
        if (customCursors.length === 0) {
          console.log("No custom cursors found.");
          addCursor(cardRef.current, event);
          
          // Add the mousemove listener
          cardRef.current.addEventListener("mousemove", handleMouseMove);
        }
      };

      // Mouse leave event
      const handleMouseLeave = () => {
        const customCursors = findCustomCursors(cardRef.current);
        if (customCursors.length === 0) {
          console.log("No cursors");
          return;
        }

        removeCursor();
        cardRef.current.removeEventListener("mousemove", handleMouseMove);
      };

      // Add event listeners
      cardRef.current.addEventListener("mouseenter", handleMouseEnter);
      cardRef.current.addEventListener("mouseleave", handleMouseLeave);

      // Clean up event listeners on unmount
      return () => {
        if (cardRef.current) {
          cardRef.current.removeEventListener("mouseenter", handleMouseEnter);
          cardRef.current.removeEventListener("mouseleave", handleMouseLeave);
          cardRef.current.removeEventListener("mousemove", handleMouseMove);
        }
      };
    }
  }, [title, addCursor, removeCursor]);

  return (
    <div
      ref={gsapRef}
      className="flex flex-1 flex-col section__projects__row-gap__title-image"
    >
      <a
        className="flex flex-1 flex-col section__projects__row-gap__title-image card"
        id={`project-text__card__${title}`}
        href={destination}
        target="_blank"
        ref={containerRef}
      >
        <div className="w-full h-[470px] inverted flex flex-col items-center justify-center relative">
          <p className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 body-text w-fit text-center">
            [IMG LOADING...]
          </p>
          <Image
            height={470}
            width={500}
            src={`/images/${imgName}`}
            style={{ maxHeight: "100%", width: "100%" }}
            className="z-10"
            onLoadingComplete={animateImage}
            alt={imgAlt}
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