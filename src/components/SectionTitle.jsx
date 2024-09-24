import React from "react";

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
      <sub className="side-decoration">{side}</sub>
      <h3 className="w-fit section-title-text absolute left-1/2 -translate-x-1/2">
        {title}
        <sup>{sup}</sup>
      </h3>
    </div>
  );
};

export default SectionTitle;
