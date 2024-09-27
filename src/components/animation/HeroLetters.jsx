"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import React from "react";

const HeroLetters = () => {
  useGSAP(() => {
    let ctx = gsap.context(() => {
      const letters = gsap.utils.toArray("span.hero-letter");

      const tl = gsap.timeline();
      tl.from(letters, {
        y: "100%",
        stagger: 0.05,
        skewX: "4",
        ease: "power1.inOut",
      });

      tl.to(".icon-cover", {
        backgroundColor: "transparent",
        ease: "power1.inOut",
        stagger: 0.05,
      });

      letters.forEach((letter) => {
        // FIXME: Current implementation will fail if the user will toggle modes

        letter.addEventListener("mouseenter", () => {
          const darkMode = localStorage.getItem("darkMode");
          let bgColor = "#1c1c1c";
          if (darkMode === "enabled") {
            bgColor = "#FFFFFF";
          }

          gsap.to(letter, {
            backgroundColor: bgColor,
            ease: "power1.inOut",
            duration: 0.3,
          });
        });

        letter.addEventListener("mouseleave", () => {
          gsap.to(letter, {
            backgroundColor: "transparent",
            delay: 1,
            ease: "power1.inOut",
            duration: 0.3,
          });
        });
      });
    });

    // cleanup
    return () => ctx.revert(); // <-- CLEANUP!
  });
  return <div></div>;
};

export default HeroLetters;
