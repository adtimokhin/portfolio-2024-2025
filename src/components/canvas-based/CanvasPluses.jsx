"use client";
import React, { useRef, useEffect } from "react";

const CanvasPluses = ({ color }) => {
  const canvasRef = useRef(null);

  //   FIXME: Impossible to toggle between colors for the theme change
  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    // Disable image smoothing to avoid smudging
    context.imageSmoothingEnabled = false;

    // SVG image data (converted to an image object for drawing)
    const svgImage = new Image();
    svgImage.src = `data:image/svg+xml;utf8,<svg width="23" height="23" viewBox="0 0 23 23" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M13.1741 22.6875H9.8964L9.94606 13.2106H0.560059V10.1161H9.94606L9.8964 0.6875H13.1741V10.1161H22.5601V13.2106H13.1741V22.6875Z" fill="%23${color}"/></svg>`;

    svgImage.onload = () => {
      // Set canvas size to the size of its parent element
      canvas.width = canvas.parentElement.offsetWidth;
      canvas.height = canvas.parentElement.offsetHeight;

      const svgSize = 40; // Size of the plus sign
      const verticalOff = 20;
      const horizontalOff = 20;
      const initialVericalOff = 20;
      const initialHorizontalOff = 20;

      // Function to draw the repeating SVG pattern
      const drawPattern = () => {
        context.clearRect(0, 0, canvas.width, canvas.height);

        // Fill the canvas with the SVG repeated
        for (
          let x = initialVericalOff;
          x < canvas.width;
          x += svgSize + verticalOff
        ) {
          for (
            let y = initialHorizontalOff;
            y < canvas.height;
            y += svgSize + horizontalOff
          ) {
            context.drawImage(svgImage, x, y, svgSize, svgSize);
          }
        }
      };

      // Draw the pattern initially
      drawPattern();

      // Handle window resize to adjust canvas size and redraw
      const handleResize = () => {
        canvas.width = canvas.parentElement.offsetWidth;
        canvas.height = canvas.parentElement.offsetHeight;
        drawPattern();
      };

      window.addEventListener("resize", handleResize);

      // Cleanup resize event listener on unmount
      return () => {
        window.removeEventListener("resize", handleResize);
      };
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="w-full h-full absolute top-0 left-0 -z-50"
    />
  );
};

export default CanvasPluses;
