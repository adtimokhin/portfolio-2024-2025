"use client";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import React, { useEffect, useRef } from "react";

const DynamicTextWrapper = ({ text }) => {
  const textRef = useRef(null);
  const gsapRef = useRef(null);

  const { contextSafe } = useGSAP({ scope: gsapRef });

  const animateEnter = contextSafe(() => {
    const lines = gsap.utils.toArray(".line-content");
    gsap.registerPlugin(ScrollTrigger);

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: "p",
        start: "bottom bottom",
        duration: 1.2,
      },
    });

    tl.from(lines, {
      y: "100%",
      opacity: 0,
      stagger: 0.2,
      ease: "power1.inOut",
      delay: 1.65,
      onComplete: () => {
        lines.forEach((line) => {
          line.addEventListener("mouseenter", () => {
            const darkMode = localStorage.getItem("darkMode");
            let bgColor = "#1c1c1c";
            if (darkMode === "enabled") {
              bgColor = "#FFFFFF";
            }

            gsap.to(line, {
              backgroundColor: bgColor,
              ease: "power1.inOut",
              duration: 0.3,
            });
          });

          line.addEventListener("mouseleave", () => {
            gsap.to(line, {
              backgroundColor: "transparent",
              delay: 1,
              ease: "power1.inOut",
              duration: 0.3,
            });
          });
        });
      },
    });
  });

  useEffect(() => {
    const pElement = textRef.current;

    // Create a temporary element to measure line breaks
    const temp = document.createElement("div");
    temp.style.position = "absolute";
    temp.style.visibility = "hidden";
    temp.style.whiteSpace = "nowrap";
    temp.style.font = getComputedStyle(pElement).font; // Use the same font style as the paragraph
    document.body.appendChild(temp);

    const containerWidth = pElement.offsetWidth; // Get the width of the container

    const words = text.split(" "); // Split the text into words
    let lines = [];
    let currentLine = "";

    // Function to measure the width of a string
    const measureText = (text) => {
      temp.textContent = text;
      return temp.offsetWidth;
    };

    // Add words to the line until the total width exceeds the container width
    words.forEach((word, index) => {
      const newLine = currentLine ? `${currentLine} ${word}` : word;
      const newLineWidth = measureText(newLine);

      if (newLineWidth < containerWidth) {
        // If the current line with the new word fits, keep adding to it
        currentLine = newLine;
      } else {
        // If it doesn't fit, push the current line and start a new one
        lines.push(currentLine);
        currentLine = word; // Start a new line with the current word
      }
    });

    if (currentLine) {
      lines.push(currentLine); // Push the last line
    }

    // Clean up the temporary element
    document.body.removeChild(temp);

    // Replace text with spans, each containing a line of text
    pElement.innerHTML = lines
      .map(
        (line) =>
          `<span><span class="line-content animatable-span">${line}</span></span>`
      )
      .join("<br/>");

    animateEnter();
  }, []);

  return (
    <div ref={gsapRef}>
      <p ref={textRef}>{text}</p>
    </div>
  );
};

export default DynamicTextWrapper;
