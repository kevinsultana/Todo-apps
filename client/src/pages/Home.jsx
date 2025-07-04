import { useEffect, useState } from "react";
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
import LoadingModal from "../components/LoadingModal";

export default function Home() {
  const navigate = useNavigate();
  const userData = JSON.parse(localStorage.getItem("user"));
  console.log(userData);

  const [showUserModal, setShowUserModal] = useState(false);
  const [showAddTaskModal, setShowAddTaskModal] = useState(false);

  const [selectedDataEdit, setSelectedDataEdit] = useState(null);
  const [selectedDataDelete, setSelectedDataDelete] = useState(null);

  const [query, setQuery] = useState("");

  const [masterTodos, setMasterTodos] = useState([]);
  const [displayedTodos, setDisplayedTodos] = useState([]);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!userData) {
      navigate("/login", { replace: true });
    }
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
    setLoading(true);
    try {
      const response = await BaseApi.get(`/todos?userId=${userData.id}`);
      setMasterTodos(response.data);
      setLoading(false);
    } catch (error) {
      setLoading(true);
      console.log(error);
    }
  };

  useEffect(() => {
    getTaskById();
  }, []);

  useEffect(() => {
    const sortedTodos = [...masterTodos].sort((a, b) => {
      if (a.isDone && !b.isDone) return 1;
      if (!a.isDone && b.isDone) return -1;
      return 0;
    });
    setDisplayedTodos(sortedTodos);
  }, [masterTodos]);

  const postUserTask = async (title, description, dueDate) => {
    setLoading(true);
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
      setLoading(false);
      console.log(error);
    }
  };

  const postEditUserTask = async (title, description, id, dueDate) => {
    setLoading(true);
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
      setLoading(false);
      console.log(error);
    }
  };

  const deleteUserTask = async () => {
    setLoading(true);
    try {
      await BaseApi.delete(`/todos/${selectedDataDelete.id}`);
      getTaskById();
      setSelectedDataDelete(null);
      toast.success("Task deleted successfully");
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  const updateCompleteTask = async (item, status) => {
    setLoading(true);
    try {
      await BaseApi.put(`/todos/${item.id}`, {
        ...item,
        isDone: status,
      });
      getTaskById();
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  const handleSaveEditUser = async (name, password, id) => {
    setLoading(true);
    try {
      const response = await BaseApi.put(`/users/${id}`, {
        id: id,
        userName: name,
        password: password,
      });
      setLoading(false);
      setShowUserModal(false);
      localStorage.removeItem("user");
      localStorage.setItem("user", JSON.stringify(response.data));
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  const handleDeleteUser = async (user) => {
    setLoading(true);
    setShowUserModal(false);
    try {
      await BaseApi.delete(`/users/${user.id}`);
      const todosResponse = await BaseApi.get(`/todos?userId=${user.id}`);
      const todos = todosResponse.data;
      for (const todo of todos) {
        await BaseApi.delete(`/todos/${todo.id}`);
      }
      localStorage.removeItem("user");
      setLoading(false);
      navigate("/login", { replace: true });
    } catch (error) {
      setLoading(false);
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
      {loading && <LoadingModal />}
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
        onDeleteUser={handleDeleteUser}
        onCloseModal={() => setShowUserModal(false)}
        onSaveEditUser={(name, password, id) =>
          handleSaveEditUser(name, password, id)
        }
      />
      <Footer />
    </div>
  );
}
