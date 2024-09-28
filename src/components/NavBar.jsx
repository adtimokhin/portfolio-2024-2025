"use client";
import React from "react";

// Styles
import "@/app/styles/components/navbar.sass";

// Icons
import Logo from "./icons/Logo";
import Invert from "./icons/Invert";

// Scripts
import { changeTheme } from "@/app/scripts/theme-change";
import HoverAnimation from "./animation/HoverAnimation";
import SmallLogo from "./icons/SmallLogo";

/**
 *
 * This navbar is common for all pages on this website
 *
 */
const NavBar = () => {
  return (
    <nav className="w-screen border-b border-text_light dark:border-text_dark fixed top-0 flex flex-row justify-center align-middle items-center bg-background_light dark:bg-background_dark navbar__padding-y z-[9997] transition-colors ease-out-expo duration-300">
      <div className="flex flex-row justify-between align-middle items-center container-fit">
        <HoverAnimation>
          <a href="/" className="desktop:flex tablet:flex phone:hidden">
            <Logo />
          </a>

          <div className="desktop:hidden tablet:hidden phone:flex">
            <HoverAnimation>
              <p>menu</p>
            </HoverAnimation>
          </div>
        </HoverAnimation>

        <div onClick={changeTheme} className="hover:cursor-pointer">
          <Invert />
        </div>

        {/* The actual links */}
        {/* For larger devices */}
        <div className="w-fit absolute left-1/2 spaced-links desktop:flex tablet:flex phone:hidden">
          <HoverAnimation>
            <a href="/#projects" className="body-text">
              projects
            </a>
          </HoverAnimation>
          <HoverAnimation>
            <a href="/#process" className="body-text">
              process
            </a>
          </HoverAnimation>
          <HoverAnimation>
            <a href="/#contact" className="body-text">
              contact
            </a>
          </HoverAnimation>
        </div>

        {/* For smaller devices */}
        <div className="w-fit absolute left-1/2 spaced-links desktop:hidden tablet:hidden phone:flex">
          <HoverAnimation>
            <SmallLogo />
          </HoverAnimation>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
