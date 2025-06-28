import React, { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../context/globalContext";
import { useNavigate } from "react-router";
import NavBar from "../components/NavBar";
import { MdAddTask } from "react-icons/md";
import TaskCard from "../components/TaskCard";
import Footer from "../components/Footer";
import UserModal from "../components/UserModal";
import { BaseApi } from "../Api/BaseApi";
import AddTaskModal from "../components/AddTaskModal";

export default function Home() {
  const navigate = useNavigate();
  const userData = JSON.parse(localStorage.getItem("user"));
  const { user, setUser } = useContext(GlobalContext);
  // console.log(user);

  const [showUserModal, setShowUserModal] = useState(false);
  const [showAddTaskModal, setShowAddTaskModal] = useState(false);
  const [userTodos, setUserTodos] = useState([]);

  useEffect(() => {
    if (userData) {
      setUser(userData);
    } else {
      navigate("/login", { replace: true });
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    navigate("/login");
  };

  const day = new Date().toLocaleString("en-US", { weekday: "long" });
  const dateToday = new Date().toLocaleDateString("en-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const getTaskById = async () => {
    try {
      const response = await BaseApi.get(`/todos?userId=${userData.id}`);
      // console.log(response.data);
      setUserTodos(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getTaskById();
  }, []);

  const postUserTask = async (title, description) => {
    try {
      const response = await BaseApi.post("/todos", {
        title,
        description,
        userId: userData.id,
      });
      console.log(response.data);
      getTaskById();
      setShowAddTaskModal(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col bg-gray-100 dark:bg-gray-900 min-h-screen transition-all duration-300">
      <NavBar onClickLogout={() => setShowUserModal(true)} />
      <header className="p-4 text-center">
        <h1 className="text-lg font-bold dark:text-white trasnsition-all duration-300">
          Welcome {capitalizeFirstLetter(userData?.userName)}, today is{" "}
          {dateToday}
        </h1>
      </header>
      <main className="flex-grow mx-4 bg-white rounded-2xl shadow-2xl">
        <div className="py-2 px-4">
          {/* head */}
          <div className="flex items-center justify-between">
            <h1 className="text-xl">{day}</h1>
            <button
              onClick={() => setShowAddTaskModal(true)}
              className="text-2xl px-4 py-1 bg-teal-500 rounded-xl text-white"
            >
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
          <div>
            {userTodos.map((item) => {
              return <TaskCard key={item.id} item={item} />;
            })}
          </div>
        </div>
      </main>
      <AddTaskModal
        isOpen={showAddTaskModal}
        onCloseModal={() => setShowAddTaskModal(false)}
        onSave={(e) => postUserTask(e.title, e.description)}
      />
      <UserModal
        onClose={() => handleLogout()}
        isOpen={showUserModal}
        onCloseModal={() => setShowUserModal(false)}
      />
      <Footer />
    </div>
  );
}
