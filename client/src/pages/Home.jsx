import React, { use, useContext, useEffect } from "react";
import { GlobalContext } from "../context/globalContext";
import { useNavigate } from "react-router";
import NavBar from "../components/NavBar";
import { MdAddTask } from "react-icons/md";

export default function Home() {
  const navigate = useNavigate();

  const { user } = useContext(GlobalContext);

  // console.log(user);
  useEffect(() => {
    if (user === null) {
      navigate("/login");
    }
  }, []);

  const day = new Date().toLocaleString("en-US", { weekday: "long" });

  return (
    <div className="bg-gray-100 dark:bg-gray-900 min-h-screen transition-all duration-300">
      <NavBar />
      <main className=" m-4 bg-white rounded-2xl">
        <div className="flex items-center justify-between py-2 px-4">
          <h1 className="text-xl">{day}</h1>
          <button className="text-2xl px-4 py-1 bg-teal-500 rounded-xs text-white">
            <MdAddTask />
          </button>
        </div>
      </main>
    </div>
  );
}
