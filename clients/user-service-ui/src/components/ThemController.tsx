"use client"
import { useEffect, useState } from "react";
import { BsFillMoonStarsFill } from "react-icons/bs";
import { MdSunny } from "react-icons/md";

const ThemeController = () => {
  const [theme, setTheme] = useState("myLightTheme");

  // Toggle the theme when checkbox is clicked
  const toggleTheme = (event:any) => {
    const newTheme = event.target.checked ? "dark" : "myLightTheme";
    setTheme(newTheme);
    document.documentElement.setAttribute("data-theme", newTheme); // Change theme
  };

  // On initial load, set the correct theme based on user preference or default to light
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "myLightTheme";
    setTheme(savedTheme);
    document.documentElement.setAttribute("data-theme", savedTheme);
  }, []);

  // Save the theme to localStorage when it changes
  useEffect(() => {
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <>
      <label className="swap swap-rotate ml-5">
        <input
          type="checkbox"
          className="theme-controller"
          onChange={toggleTheme}
          checked={theme === "dark"}
        />

    
        <MdSunny   size={30}        className="swap-off  fill-current"
 />

        <BsFillMoonStarsFill     size={30}       className="swap-on  fill-current"
 />

      
      </label>
    </>
  );
};

export default ThemeController;
