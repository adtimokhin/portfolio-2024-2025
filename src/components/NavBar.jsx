import React from "react";
import Logo from "./icons/Logo";
import Invert from "./icons/Invert";

/**
 *
 * This navbar is common for all pages on this website
 *
 * @returns
 */

// TODO: Add appropriate spacings for the menu
// FIXME: Fix the fact that the border is not in fact black
// FIXME: Add a padding from the top of the screen
const NavBar = () => {
  return (
    <nav className="w-full border-b border-black sticky top-0 flex flex-row justify-between align-middle items-center bg-white">
      <Logo />
      <Invert />

      {/* The actual links */}
      <div className="w-fit flex flex-row gap-x-3 absolute left-1/2">
        <a href="#" className="body-text">
          projects
        </a>
        <a href="#" className="body-text">
          process
        </a>
        <a href="#" className="body-text">
          contact
        </a>
      </div>
    </nav>
  );
};

export default NavBar;
