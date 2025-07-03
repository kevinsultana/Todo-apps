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
import toast from "react-hot-toast";
import EditTaskModal from "../components/EditTaskmodal";
import DeleteTaskModal from "../components/DeleteTaskModal";
import TaskCounter from "../components/TaskCounter";

export default function Home() {
  const navigate = useNavigate();
  const userData = JSON.parse(localStorage.getItem("user"));

  const [showUserModal, setShowUserModal] = useState(false);
  const [showAddTaskModal, setShowAddTaskModal] = useState(false);

  const [selectedDataEdit, setSelectedDataEdit] = useState(null);
  const [selectedDataDelete, setSelectedDataDelete] = useState(null);

  const [query, setQuery] = useState("");

  const [masterTodos, setMasterTodos] = useState([]);
  const [displayedTodos, setDisplayedTodos] = useState([]);

  useEffect(() => {
    if (!userData) {
      navigate("/login", { replace: true });
    }
    return;
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login", { replace: true });
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
      setMasterTodos(response.data);
      // setDisplayedTodos(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getTaskById();
  }, []);

  // console.log(masterTodos);

  useEffect(() => {
    const sortedTodos = [...masterTodos].sort((a, b) => {
      if (a.isDone && !b.isDone) return 1;
      if (!a.isDone && b.isDone) return -1;
      return 0;
    });
    setDisplayedTodos(sortedTodos);
  }, [masterTodos]);

  const postUserTask = async (title, description, dueDate) => {
    try {
      await BaseApi.post("/todos", {
        title,
        description,
        userId: userData.id,
        isDone: false,
        dueDate: dueDate,
      });
      getTaskById();
      setShowAddTaskModal(false);
      toast.success("Task added successfully");
    } catch (error) {
      console.log(error);
    }
  };

  const postEditUserTask = async (title, description, id, dueDate) => {
    try {
      await BaseApi.put(`/todos/${id}`, {
        title,
        description,
        userId: userData.id,
        isDone: false,
        dueDate: dueDate,
      });
      getTaskById();
      setSelectedDataEdit(null);
      toast.success("Task edited successfully");
    } catch (error) {
      console.log(error);
    }
  };

  const deleteUserTask = async () => {
    try {
      await BaseApi.delete(`/todos/${selectedDataDelete.id}`);
      getTaskById();
      setSelectedDataDelete(null);
      toast.success("Task deleted successfully");
    } catch (error) {
      console.log(error);
    }
  };

  const updateCompleteTask = async (item, status) => {
    try {
      await BaseApi.put(`/todos/${item.id}`, {
        ...item,
        isDone: status,
      });
      getTaskById();
    } catch (error) {
      console.log(error);
    }
  };

  const handleSaveEditUser = async (name, password, id) => {
    try {
      const response = await BaseApi.put(`/user/${id}`, {
        id: id,
        userName: name,
        password: password,
      });
      setShowUserModal(false);
      localStorage.removeItem("user");
      localStorage.setItem("user", JSON.stringify(response.data));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (!query.trim()) {
      setDisplayedTodos(masterTodos);
      return;
    }

    const matchingTodos = [];
    const nonMatchingTodos = [];
    masterTodos.forEach((todo) => {
      if (todo.title.toLowerCase().includes(query.toLowerCase())) {
        matchingTodos.push(todo);
      } else {
        nonMatchingTodos.push(todo);
      }
    });

    setDisplayedTodos([...matchingTodos, ...nonMatchingTodos]);
  }, [query]);

  return (
    <div className="flex flex-col bg-gray-100 dark:bg-gray-900 min-h-screen transition-all duration-300">
      <NavBar onClickLogout={() => setShowUserModal(true)} />
      <header className="p-4 text-center">
        <h1 className="text-lg lg:text-2xl font-bold dark:text-white trasnsition-all duration-300">
          Hello {userData && capitalizeFirstLetter(userData?.userName)}, today
          is {dateToday}
        </h1>
      </header>
      <main className="flex-grow mx-4 mb-4 pb-4 bg-white dark:bg-gray-500 rounded-2xl shadow-2xl lg:min-w-4xl lg:self-center">
        <div className="py-2 px-4">
          {/* head */}
          <div className="flex items-center justify-between">
            <h1 className="text-xl lg:text-2xl dark:text-white text-black">
              {day}
            </h1>
            <button
              onClick={() => setShowAddTaskModal(true)}
              className="text-2xl lg:text-3xl px-4 py-1 bg-teal-500 rounded-xl text-white"
            >
              <MdAddTask />
            </button>
          </div>
          {/* searchbar */}
          <div className="flex justify-center w-full my-3">
            <input
              type="text"
              placeholder="Search task here"
              className="border p-1 text-base rounded-md max-w-1/2 w-full dark:border-white focus:outline-none dark:text-white lg:text-xl lg:p-2"
              onChange={(e) => setQuery(e.target.value)}
              value={query}
            />
          </div>
          {/* cards */}
          <div>
            {masterTodos.length === 0 && (
              <h1 className="text-center mt-6 text-black dark:text-white text-xl lg:text-2xl">
                Please Add New Task
              </h1>
            )}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {displayedTodos.map((item) => {
                return (
                  <TaskCard
                    key={item.id}
                    item={item}
                    onClickEdit={setSelectedDataEdit}
                    onClickDelete={setSelectedDataDelete}
                    onCheckBox={(item, status) =>
                      updateCompleteTask(item, status)
                    }
                  />
                );
              })}
            </div>
          </div>
        </div>
      </main>
      <div className="flex justify-center bg-white dark:bg-gray-500 rounded-2xl m-4 lg:min-w-4xl lg:self-center">
        <TaskCounter
          total={masterTodos.length}
          completed={masterTodos.filter((item) => item.isDone).length}
        />
      </div>
      <AddTaskModal
        isOpen={showAddTaskModal}
        onCloseModal={() => setShowAddTaskModal(false)}
        onSave={(e) => postUserTask(e.title, e.description, e.dueDate)}
      />
      {selectedDataEdit !== null && (
        <EditTaskModal
          onCloseModal={() => setSelectedDataEdit(null)}
          task={selectedDataEdit}
          onEdit={(title, description, id, dueDate) =>
            postEditUserTask(title, description, id, dueDate)
          }
        />
      )}
      {selectedDataDelete !== null && (
        <DeleteTaskModal
          item={selectedDataDelete}
          onClickCancel={() => setSelectedDataDelete(null)}
          onClickDelete={deleteUserTask}
        />
      )}
      <UserModal
        userData={userData}
        onClose={handleLogout}
        isOpen={showUserModal}
        onCloseModal={() => setShowUserModal(false)}
        onSaveEditUser={(name, password, id) =>
          handleSaveEditUser(name, password, id)
        }
      />
      <Footer />
    </div>
  );
}
