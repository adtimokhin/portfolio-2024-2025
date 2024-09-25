import React from "react";
import FooterLogo from "./icons/FooterLogo";
import Globe from "./icons/Globe";
import LargeLogoDecor from "./icons/LargeLogoDecor";

const Footer = () => {
  return (
    <footer className="w-full h-screen bg-text_light dark:bg-text_dark relative overflow-hidden desktop:mt-[200px] tablet:mt-[150px] phone:mt-[150px]">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <Globe classes={"fill-dark_gray_dimmed_light"} />
      </div>

      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2">
        <LargeLogoDecor />
      </div>

      <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <LargeLogoDecor />
      </div>

      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <FooterLogo />
      </div>
    </footer>
  );
};

export default Footer;
