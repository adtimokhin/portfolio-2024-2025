"use client"
import React, { useState } from "react";
import "@/app/styles/components/input-fields.sass"

const LargeInput = ({id, placeholder}) => {
  const [text, setText] = useState("");
  const maxLength = 500;

  const handleTextChange = (e) => {
    if (e.target.value.length <= maxLength) {
      setText(e.target.value);
    }
  };

  return (
    <div className="w-full border border-text_light dark:border-text_dark">
      <textarea
        value={text}
        onChange={handleTextChange}
        maxLength={maxLength}
        placeholder={placeholder}
        className="border-none outline-none w-full h-64 body-text"
        id={id}
      />
      <div className="text-right body-text">
        {text.length}/{maxLength} characters
      </div>
    </div>
  );
};

export default LargeInput;
