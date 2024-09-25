import React from "react";
import BlackSquare from "./animation/BlackSquare";

/**
 *
 * Used to display the title of the section that is viewed.
 *
 * @param {String} side - side text
 * @param {String} title - title of the section
 * @param {String} sup - suptext of the title of the section
 * @returns
 */
const SectionTitle = ({ side, title, sup }) => {
  return (
    <div className="w-full border-b border-text_light dark:border-text_dark flex flex-row relative h-[30px] items-center">
      <BlackSquare
        rows={5}
        cols={20}
        color={"#1c1c1c"}
        elementId={`title-${title}__side-decor`}
        time={3000}
      >
        <p id={`title-${title}__side-decor`}>
          <sub className="side-decoration">{side}</sub>
        </p>
      </BlackSquare>
      <h3 className="w-fit section-title-text absolute left-1/2 -translate-x-1/2">
        {title}
        <sup>{sup}</sup>
      </h3>
    </div>
  );
};

export default SectionTitle;
