import React, { useEffect, useState } from "react";
import logo from "../assets/logo.png";
import { MdDarkMode, MdOutlineLightMode } from "react-icons/md";

export default function Login() {
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
    <div className="flex bg-gray-50 dark:bg-gray-800 transition-all duration-300 justify-center items-center h-screen">
      {/* container */}
      <div className="p-4 bg-white dark:bg-gray-500 shadow-2xl w-sm rounded-xl">
        {/* btn dark mode */}
        <div className="flex w-full justify-end ">
          <button
            onClick={toggleDarkMode}
            className={`p-2 rounded-full border border-gray-100 transition-all duration-300 ${
              isDarkMode ? "bg-gray-600 text-white" : "bg-gray-200 text-black"
            }`}
          >
            {isDarkMode ? <MdDarkMode /> : <MdOutlineLightMode />}
          </button>
        </div>

        {/* logo and title */}
        <div className="flex flex-col gap-4 items-center mb-6">
          <img src={logo} alt="logo" className="w-26 self-center" />
          <h2 className="text-xl font-bold text-black dark:text-white">
            Tasktify
          </h2>
        </div>

        {/* inputs */}
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <label htmlFor="username" className="text-black dark:text-white">
              User Name
            </label>
            <input
              type="username"
              placeholder="Enter your username"
              className="p-2 border rounded-md text-black dark:text-white"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="password" className="text-black dark:text-white">
              Password
            </label>
            <input
              type="password"
              placeholder="Enter your password"
              className="p-2 border rounded-md text-black dark:text-white"
            />
          </div>
          <button className="bg-teal-500 text-white p-2 rounded-md w-3xs max-w-3xs self-center shadow-2xl transition-all duration-300 hover:bg-teal-600 active:bg-teal-700">
            Login
          </button>
          <button className="border-2 border-teal-500 text-black dark:text-white p-2 rounded-md w-3xs max-w-3xs self-center shadow-2xl transition-all duration-300 hover:bg-teal-400 active:bg-teal-500">
            Register
          </button>
        </div>
      </div>
    </div>
  );
}
