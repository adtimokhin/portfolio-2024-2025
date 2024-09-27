import React from "react";
import FooterLogo from "./icons/FooterLogo";
import Globe from "./icons/Globe";
import LargeLogoDecor from "./icons/LargeLogoDecor";
import CanvasPluses from "./canvas-based/CanvasPluses";

const Footer = () => {
  return (
    <footer className="w-full h-screen bg-text_light dark:bg-text_dark relative overflow-hidden desktop:mt-[200px] tablet:mt-[150px] phone:mt-[150px] transition-colors ease-out-expo duration-300">
      <div className="relative top-0 left-0 w-full h-full z-10">
        <CanvasPluses color={"242424"} />
      </div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
        <Globe classes={"fill-dark_gray_dimmed_light"} />
      </div>

      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 z-10">
        <LargeLogoDecor />
      </div>

      <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
        <LargeLogoDecor />
      </div>

      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
        <FooterLogo />
      </div>
    </footer>
  );
};

export default Footer;
