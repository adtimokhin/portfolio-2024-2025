"use client";
import React, { useState } from "react";
import DropDownSection from "./DropDownSection";

const DropDownCollection = () => {
  // FIXME: Add some plesant animation for adding text to a section. It looks a bit twitchy
  const [selectedSection, setSelectedSection] = useState(-1);

  // TODO: Make this data more nice, I guess.
  const textData = [
    <div className="desktop:w-1/2 tablet:w-full phone:w-full body-text">
      <p>1.1. We will get to know each other</p>
      <p>
        1.2. We will discuss your business and what goals must a site accomplish
      </p>
      <p>1.3. We will create an initial project plan and timeline</p>
    </div>,

    <div className="desktop:w-1/2 tablet:w-full phone:w-full body-text">
      <p>2.1 I will analyze the competition</p>
      <p>2.2. I will create profiles of prospect users of the site</p>
      <p>
        2.3. I will come up with a site structure that will be perfect for the
        user interactions
      </p>
      <p>2.4. I will plan out the content for the website</p>
    </div>,

    <div className="desktop:w-1/2 tablet:w-full phone:w-full body-text">
      <p>
        3.1 I will create multiple possible mockups of the website pages for us
        to choose for the project
      </p>
    </div>,

    <div className="desktop:w-1/2 tablet:w-full phone:w-full body-text">
      <p>
        4.1 We will discuss what design ideas and reference materials you might
        have
      </p>
      <p>4.2. I will come up with a design-concept for the site</p>
      <p>4.3. I will apply the design concept to all pages of the site</p>
    </div>,

    <div className="desktop:w-1/2 tablet:w-full phone:w-full body-text">
      <p>
        5.1 I will code the website, making sure it is adaptive to different
        screen sizes
      </p>

      <p>5.2 I will help you set up the website and hosting</p>
    </div>,
  ];

  return (
    <ul className="process-list">
      <li>
        <DropDownSection
          title={"Setting   goals"}
          elementNumber="1"
          setSectionSelected={() => {
            setSelectedSection(1);
          }}
          deselectSection={() => {
            setSelectedSection(-1);
          }}
          text={selectedSection == 1 ? textData[0] : <></>}
        />
      </li>
      <li>
        <DropDownSection
          title={"Analyzing"}
          elementNumber="2"
          setSectionSelected={() => {
            setSelectedSection(2);
          }}
          deselectSection={() => {
            setSelectedSection(-1);
          }}
          text={selectedSection == 2 ? textData[1] : <></>}
        />
      </li>
      <li>
        <DropDownSection
          title={"Prototyping"}
          elementNumber="3"
          setSectionSelected={() => {
            setSelectedSection(3);
          }}
          deselectSection={() => {
            setSelectedSection(-1);
          }}
          text={selectedSection == 3 ? textData[2] : <></>}
        />
      </li>
      <li>
        <DropDownSection
          title={"Designing"}
          elementNumber="4"
          setSectionSelected={() => {
            setSelectedSection(4);
          }}
          deselectSection={() => {
            setSelectedSection(-1);
          }}
          text={selectedSection == 4 ? textData[3] : <></>}
        />
      </li>
      <li>
        <DropDownSection
          title={"Coding"}
          elementNumber="5"
          setSectionSelected={() => {
            setSelectedSection(5);
          }}
          deselectSection={() => {
            setSelectedSection(-1);
          }}
          text={selectedSection == 5 ? textData[4] : <></>}
        />
      </li>
    </ul>
  );
};

export default DropDownCollection;
