import React from "react";

const HoverAnimation = (props) => {
  return <span className="hover:bg-text_light hover:text-background_light dark:hover:bg-text_dark dark:hover:text-background_dark  transition-colors ease-in-out duration-300">{props.children}</span>;
};

export default HoverAnimation;
