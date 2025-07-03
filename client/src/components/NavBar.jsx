import React, { useEffect, useState } from "react";
import logo from "../assets/logo.png";
import { MdDarkMode, MdOutlineLightMode } from "react-icons/md";
import { FaRegUser } from "react-icons/fa";

export default function NavBar({ onClickLogout }) {
  const [isDarkMode, setIsDarkMode] = useState(
    localStorage.getItem("darkMode") === "true"
  );

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("darkMode", "true");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("darkMode", "false");
    }
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };
  return (
    <div className="flex px-4 py-2 lg:px-100 items-center justify-between bg-teal-100 dark:bg-teal-700 shadow-2xl shadow-black/30 trasnition-all duration-300">
      <div className="flex items-center gap-2">
        <img src={logo} alt="logo" className="w-6 lg:w-10" />
        <h1 className="text-lg font-bold lg:text-2xl text-black dark:text-white">
          Tasktify
        </h1>
      </div>
      <div className="flex items-center gap-6">
        <button
          onClick={onClickLogout}
          className="text-xl lg:text-2xl dark:text-white"
        >
          <FaRegUser />
        </button>
        <button
          onClick={toggleDarkMode}
          className={`p-2 rounded-full border lg:text-2xl border-gray-100 transition-all duration-300 ${
            isDarkMode ? "bg-gray-600 text-white" : "bg-gray-200 text-black"
          }`}
        >
          {isDarkMode ? <MdDarkMode /> : <MdOutlineLightMode />}
        </button>
      </div>
    </div>
  );
}
