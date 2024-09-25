/**
 * This function is envoked in other parts of the website to change the theme
 * of the whole page from light to dark and back
 *
 * This function will check the <body/> HTML component for class .dark
 * If it is present, it will be removed to indicate change to light mode
 *
 * If the class was not present, it will be added, indicating the change to
 * Dark mode
 *
 * Note: we use .dark class as it is the way to toggle the dark mode in TailwindCSS
 * In all parts that rely on sass styles, use the same class name for change to dark mode
 */
export function changeTheme() {
  // Get the body element
  const body = document.body;

  // Check if the body has the 'dark' class
  if (body.classList.contains("dark")) {
    // Remove the 'dark' class if it is present
    body.classList.remove("dark");
  } else {
    // Add the 'dark' class if it is not present
    body.classList.add("dark");
  }

  updateSVGFillColor();
}

/**
 * This function will update the colors of all white and black svgs
 *
 * It is called inside the changeTheme() function, so you do not need to envoke it
 *
 * TODO: Update the function to work on svgs that also have light and dark gray colors
 */
function updateSVGFillColor() {
  // Get all svg elements on the page
  const svgs = document.querySelectorAll("svg");

  // Loop through each svg element
  svgs.forEach((svg) => {
    // Find all path, circle, rect, polygon, and other fillable elements inside the svg
    const fillableElements = svg.querySelectorAll(
      "path, circle, rect, polygon, ellipse, line"
    );

    // Loop through each fillable element
    fillableElements.forEach((element) => {
      // Check if the current fill color is #1c1c1c
      const fillColor = window.getComputedStyle(element).fill;

      if (fillColor === "rgb(28, 28, 28)" || fillColor === "#1c1c1c") {
        element.style.fill = "#ffffff";
      } else if (
        fillColor === "rgb(255, 255, 255)" ||
        fillColor === "#ffffff"
      ) {
        element.style.fill = "#1c1c1c";
      } else if (
        fillColor === "rgb(223, 223, 223)" ||
        fillColor === "#dfdfdf"
      ) {
        element.style.fill = "#3e3e3e";
      } else if (fillColor === "rgb(36, 36, 36)" || fillColor === "#242424") {
        element.style.fill = "#c3c3c3";
      } else if (
        fillColor === "rgb(195, 195, 195)" ||
        fillColor === "#c3c3c3"
      ) {
        element.style.fill = "#242424";
      } else if (fillColor === "rgb(62, 62, 62)" || fillColor === "#3e3e3e") {
        element.style.fill = "#dfdfdf";
      }
    });
  });
}
