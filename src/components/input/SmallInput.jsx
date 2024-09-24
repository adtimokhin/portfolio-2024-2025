import React from 'react';
import "@/app/styles/components/input-fields.sass"

const SmallInput = ({placeholder, id, inputType}) => {
  return (
    <div className="w-full border border-text_light dark:border-text_dark">
      <input
        type={inputType}
        id={id}
        className="w-full focus:outline-none body-text"
        placeholder={placeholder}
        style={{ border: 'none' }}
      />
    </div>
  );
};

export default SmallInput;

