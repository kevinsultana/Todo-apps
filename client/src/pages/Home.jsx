import React, { use, useContext, useEffect, useState } from "react";
import { GlobalContext } from "../context/globalContext";
import { useNavigate } from "react-router";
import NavBar from "../components/NavBar";
import { MdAddTask } from "react-icons/md";
import TaskCard from "../components/TaskCard";
import Footer from "../components/Footer";
import UserModal from "../components/UserModal";
import { BaseApi } from "../Api/BaseApi";
import AddTaskModal from "../components/AddTaskModal";
import toast from "react-hot-toast";
import EditTaskModal from "../components/EditTaskmodal";
import DeleteTaskModal from "../components/DeleteTaskModal";

export default function Home() {
  const navigate = useNavigate();
  const userData = JSON.parse(localStorage.getItem("user"));
  const { user, setUser } = useContext(GlobalContext);
  // console.log(user);

  const [showUserModal, setShowUserModal] = useState(false);
  const [showAddTaskModal, setShowAddTaskModal] = useState(false);
  const [showEditTaskModal, setShowEditTaskModal] = useState(false);

  const [selectedDataEdit, setSelectedDataEdit] = useState(null);
  const [selectedDataDelete, setSelectedDataDelete] = useState(null);

  const [query, setQuery] = useState("");
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
    console.log("jalan saat ngetik");
    try {
      const response = await BaseApi.get(`/todos?userId=${userData.id}`);
      console.log(response.data);
      setUserTodos(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getTaskById();
  }, [query]);

  const postUserTask = async (title, description) => {
    try {
      const response = await BaseApi.post("/todos", {
        title,
        description,
        userId: userData.id,
        isDone: false,
      });
      console.log(response.data);
      getTaskById();
      setShowAddTaskModal(false);
      toast.success("Task added successfully");
    } catch (error) {
      console.log(error);
    }
  };

  const postEditUserTask = async (title, description, id) => {
    try {
      const response = await BaseApi.put(`/todos/${id}`, {
        title,
        description,
        userId: userData.id,
        isDone: false,
      });
      console.log(response.data);
      getTaskById();
      setSelectedDataEdit(null);
      toast.success("Task edited successfully");
    } catch (error) {
      console.log(error);
    }
  };

  const deleteUserTask = async () => {
    try {
      const response = await BaseApi.delete(`/todos/${selectedDataDelete.id}`);
      console.log(response.data);
      getTaskById();
      setSelectedDataDelete(null);
      toast.success("Task deleted successfully");
    } catch (error) {
      console.log(error);
    }
  };

  const updateCompleteTask = async (item, status) => {
    console.log(item, status);
    try {
      const response = await BaseApi.put(`/todos/${item.id}`, {
        title: item.title,
        description: item.description,
        userId: item.userId,
        isDone: status,
      });

      getTaskById();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col bg-gray-100 dark:bg-gray-900 min-h-screen transition-all duration-300">
      <NavBar onClickLogout={() => setShowUserModal(true)} />
      <header className="p-4 text-center">
        <h1 className="text-lg font-bold dark:text-white trasnsition-all duration-300">
          Welcome {userData && capitalizeFirstLetter(userData?.userName)}, today
          is {dateToday}
        </h1>
      </header>
      <button
        id="btn-referesh"
        onClick={getTaskById}
        className="text-white text-xl bg bg-red-500 p-4"
      >
        Refresh
      </button>
      <main className="flex-grow mx-4 mb-4 bg-white rounded-2xl shadow-2xl">
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
              onChange={(e) => setQuery(e.target.value)}
              value={query}
            />
          </div>
          {/* cards */}
          <div>
            {userTodos.map((item) => {
              return (
                <TaskCard
                  key={item.id}
                  item={item}
                  onClickEdit={(item) => {
                    setSelectedDataEdit(item);
                  }}
                  onClickDelete={(item) => {
                    setSelectedDataDelete(item);
                  }}
                  onCheckBox={(item, e) =>
                    updateCompleteTask(item, e.target.checked)
                  }
                />
              );
            })}
          </div>
        </div>
      </main>
      <div className="rounded-2xl shadow-2xl flex justify-between">
        <div className="bg-white p-4">
          <h1>task created</h1>
          <p>{userTodos.length}</p>
        </div>
        <div className="bg-white p-4">
          <h1>completed task</h1>
          <p>{userTodos.filter((item) => item.isDone).length}</p>
        </div>
      </div>
      <AddTaskModal
        isOpen={showAddTaskModal}
        onCloseModal={() => setShowAddTaskModal(false)}
        onSave={(e) => postUserTask(e.title, e.description)}
      />
      {selectedDataEdit !== null && (
        <EditTaskModal
          onCloseModal={() => setSelectedDataEdit(null)}
          task={selectedDataEdit}
          onEdit={(e) => postEditUserTask(e.title, e.description, e.id)}
        />
      )}
      {selectedDataDelete !== null && (
        <DeleteTaskModal
          item={selectedDataDelete}
          onClickCancel={() => setSelectedDataDelete(null)}
          onClickDelete={() => {
            deleteUserTask();
          }}
        />
      )}
      <UserModal
        onClose={() => handleLogout()}
        isOpen={showUserModal}
        onCloseModal={() => setShowUserModal(false)}
      />
      <Footer />
    </div>
  );
}
