"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";

const ProjectCard = ({ imgName, imgAlt, title, destination }) => {
  // Use refs instead of let variables for better React practices
  const cursorRef = useRef(null);
  const textRef = useRef(null);
  const spanRef = useRef(null);
  const cardRef = useRef(null);

  // Add refs for tracking mouse movement
  const mousePositionRef = useRef({ x: 0, y: 0 });
  const lastMousePositionRef = useRef({ x: 0, y: 0 });
  const mouseVelocityRef = useRef({ x: 0, y: 0 });
  const lastUpdateTimeRef = useRef(0);

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
      const maskOverlay = gsapRef.current.querySelector(".mask-overlay");
      
      // Create a timeline for scroll-triggered animations
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: card,
          start: "top 70%", // Start animation when the top of the card reaches 70% from the top of the viewport
          end: "bottom 50%", // End animation when the bottom of the card reaches 50% from the top
          toggleActions: "play none none none", 
          markers: false, // Set to true for debugging
        },
      });

      // Add animations to the timeline
      tl.to(maskOverlay, {
        x: "100%", 
        duration: 0.8,
        ease: "power3.inOut",
      }).from(jumpText, {
        y: "100%",
        duration: 0.5,
        ease: "power2.out",
      }, "-=0.3"); // Start this animation 0.3 seconds before the previous one ends
      
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

  // Function to calculate mouse velocity
  const updateMouseVelocity = (event) => {
    const currentTime = Date.now();
    const deltaTime = currentTime - lastUpdateTimeRef.current;
    
    if (deltaTime > 0) {  // Avoid division by zero
      // Update current mouse position
      mousePositionRef.current = { 
        x: event.clientX, 
        y: event.clientY 
      };
      
      // Calculate velocity (pixels per millisecond)
      mouseVelocityRef.current = {
        x: (mousePositionRef.current.x - lastMousePositionRef.current.x) / deltaTime,
        y: (mousePositionRef.current.y - lastMousePositionRef.current.y) / deltaTime
      };
      
      // Store current position and time for next calculation
      lastMousePositionRef.current = { ...mousePositionRef.current };
      lastUpdateTimeRef.current = currentTime;
      
      // Apply the skew based on velocity if the text element exists
      applySkewToText();
    }
  };

  // Function to apply skew based on velocity
  const applySkewToText = contextSafe(() => {
    if (textRef.current) {
      // Calculate skew amount based on velocity
      // Multiply by a factor to make the effect more noticeable
      // Using the X velocity for horizontal movement
      const skewFactor = 30; // Adjust this value to control the intensity of the skew
      const maxSkew = 15; // Maximum skew in degrees
      
      // Calculate skew based on X velocity (horizontal mouse movement)
      let skewAmount = mouseVelocityRef.current.x * skewFactor;
      
      // Limit the skew to a reasonable range
      skewAmount = -1 * Math.max(Math.min(skewAmount, maxSkew), -maxSkew);
      
      // Apply the skew transform
      gsap.to(textRef.current, {
        skewX: skewAmount,
        duration: 0.4, // Quick transition for responsive feel
        ease: "power2.out"
      });
    }
  });

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
    
    // Initialize mouse position tracking
    lastMousePositionRef.current = { 
      x: event.clientX, 
      y: event.clientY 
    };
    mousePositionRef.current = { ...lastMousePositionRef.current };
    lastUpdateTimeRef.current = Date.now();

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
        skewX: 0, // Reset skew when removing
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
    // Instead of animating opacity directly, we'll just ensure the image is ready
    // The reveal will be handled by the scroll trigger animation
    const img = containerRef.current.querySelector("img");
    if (img) {
      img.style.opacity = "1";
    }
  });

  const handleMouseMove = (e) => {
    const x = e.clientY - cursorHeight + window.scrollY;
    const y = e.clientX - cursorWidth;
    moveCursor(x, y);
    
    // Update velocity on mouse move
    updateMouseVelocity(e);
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
        <div className="w-full h-[470px] inverted flex flex-col items-center justify-center relative overflow-hidden">
          <p className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 body-text w-fit text-center">
            [IMG LOADING...]
          </p>
          {/* Image container with mask effect */}
          <div className="image-container relative w-full h-full overflow-hidden">
            <Image
              height={470}
              width={500}
              src={`/images/${imgName}`}
              style={{ maxHeight: "100%", width: "100%", opacity: 1 }}
              className="z-10"
              onLoadingComplete={animateImage}
              alt={imgAlt}
            />
            {/* Mask overlay that will slide from left to right */}
            <div className="mask-overlay absolute top-0 left-0 w-full h-full bg-background_light dark:bg-background_dark z-20"></div>
          </div>
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