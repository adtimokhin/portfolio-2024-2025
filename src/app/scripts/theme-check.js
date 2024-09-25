"use client";

import { changeTheme } from "./theme-change";

// Check if dark mode is enabled in localStorage on page load
window.addEventListener("load", () => {
  const darkMode = localStorage.getItem("darkMode");
  // If dark mode is enabled, apply the 'dark' class to the body
  if (darkMode === "enabled") {
    changeTheme(); // Default is white theme
  }
});
