import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setTheme } from "../app/Slices/userSlice";
const ThemeSelector = () => {
  const [theme, setThemeForUser] = useState("light");

  const themes = [
    "light",
    "dark",
    "cupcake",
    "bumblebee",
    "emerald",
    "corporate",
    "synthwave",
    "retro",
    "cyberpunk",
    "valentine",
    "halloween",
    "garden",
    "forest",
    "aqua",
    "lofi",
    "pastel",
    "fantasy",
    "wireframe",
    "black",
    "luxury",
    "dracula",
    "cmyk",
  ];

const dispatch = useDispatch();

const setUserTheme = (theme) => {
    console.log(theme);
    dispatch(setTheme(theme));
    }

  return (
    <div className="min-h-screen bg-base-200 p-6">
      <h2 className="text-3xl font-bold mb-6 text-center">Select a Theme</h2>
      <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-2">
          {themes.map((t) => (
            <button
              key={t}
              className={`
                group flex flex-col items-center gap-1.5 p-2 rounded-lg transition-colors
                ${theme === t ? "bg-base-200" : "hover:bg-base-200/50"}
              `}
              onClick={() => {setUserTheme(t), setThemeForUser(t)}}
            >
              <div className="relative h-8 w-full rounded-md overflow-hidden" data-theme={t}>
                <div className="absolute inset-0 grid grid-cols-4 gap-px p-1">
                  <div className="rounded bg-primary"></div>
                  <div className="rounded bg-secondary"></div>
                  <div className="rounded bg-accent"></div>
                  <div className="rounded bg-neutral"></div>
                </div>
              </div>
              <span className="text-[11px] font-medium truncate w-full text-center">
                {t.charAt(0).toUpperCase() + t.slice(1)}
              </span>
            </button>
          ))}
        </div>
    </div>
  );
};

export default ThemeSelector;
