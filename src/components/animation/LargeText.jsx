"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import React from "react";

const LargeText = () => {
  useGSAP(() => {
    let ctx = gsap.context(() => {
      const letters = gsap.utils.toArray("span.large-text__letter");

      const tl = gsap.timeline();
      tl.from(letters, {
        color: "red",
      });

      tl.from("#hero-body-text", { opacity: 0, ease: "power2.inOut" });
    });

    // cleanup
    return () => ctx.revert(); // <-- CLEANUP!
  });
  return <></>;
};

export default LargeText;
