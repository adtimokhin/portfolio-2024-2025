import React from "react";

const ProjectCard = ({ imgDest, imgAlt, title }) => {
  return (
    <div className="flex flex-1 flex-col section__projects__row-gap__title-image">
      {/* TODO: Set the height correctly */}
      <div className="w-full h-[470px] bg-lime-500">img</div>
      <p className="body-text">{title}</p>
    </div>
  );
};

export default ProjectCard;
