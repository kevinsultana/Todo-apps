import React, { use, useContext, useEffect } from "react";
import { GlobalContext } from "../context/globalContext";
import { useNavigate } from "react-router";
import NavBar from "../components/NavBar";
import { MdAddTask } from "react-icons/md";
import TaskCard from "../components/TaskCard";

export default function Home() {
  const navigate = useNavigate();
  const userData = JSON.parse(localStorage.getItem("user"));
  const { user, setUser } = useContext(GlobalContext);

  console.log(user);
  useEffect(() => {
    if (userData) {
      setUser(userData);
    } else {
      navigate("/login");
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    navigate("/login");
  };

  const day = new Date().toLocaleString("en-US", { weekday: "long" });

  return (
    <div className="bg-gray-100 dark:bg-gray-900 min-h-screen transition-all duration-300">
      <NavBar onClickLogout={() => handleLogout()} />
      <main className=" m-4 bg-white rounded-2xl">
        <div className="py-2 px-4">
          {/* head */}
          <div className="flex items-center justify-between">
            <h1 className="text-xl">{day}</h1>
            <button className="text-2xl px-4 py-1 bg-teal-500 rounded-xl text-white">
              <MdAddTask />
            </button>
          </div>
          {/* searchbar */}
          <div className="flex justify-center w-full my-3">
            <input
              type="text"
              placeholder="Search task here"
              className="border p-1 text-base"
            />
          </div>
          {/* cards */}
          <TaskCard />
        </div>
      </main>
    </div>
  );
}
