"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import React from "react";

const HeroLetters = () => {
  useGSAP(() => {
    let ctx = gsap.context(() => {
      const letters = gsap.utils.toArray("span.hero-letter");
      console.log("letters", letters);

      const tl = gsap.timeline();
      tl.from(letters, {
        y: "100%",
        stagger: 0.05,
        skewX: "4",
        ease: "power1.inOut",
      });

      tl.from("#hero-body-text", { opacity: 0,  ease: "power2.inOut" });
    });

    // cleanup
    return () => ctx.revert(); // <-- CLEANUP!
  });
  return <div></div>;
};

export default HeroLetters;
