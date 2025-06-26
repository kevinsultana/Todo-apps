import { useEffect, useState } from "react";
import { BaseApi } from "../Api/BaseApi";

export default function Home() {
  const [user, setUser] = useState([]);
  const [todoData, setTodoData] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);

  const getUser = async () => {
    try {
      const response = await BaseApi.get("/user");
      setUser(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getTodoById = async (id) => {
    try {
      const response = await BaseApi.get(`/todos/?userId=${id}`);
      setTodoData(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const createNewUser = async () => {
    try {
      const response = await BaseApi.post("/user", {
        name: "admin",
        password: "admin",
      });
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const createNewTodoById = async () => {
    try {
      const response = await BaseApi.post("/todos", {
        title: "Learn React",
        description: "Learn React",
        completed: false,
        userId: "7f3a",
      });
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <div className="min-h-screen flex flex-col justify-center items-center">
      {/* <button onClick={createNewUser}>Create New User</button> */}
      <button onClick={() => setSelectedUser(null)}>log out</button>
      <button onClick={() => createNewTodoById()}>createNewTodoById</button>
      <h1>Todo Apps</h1>
      {selectedUser === null && (
        <div>
          <h3>User List</h3>
          {user.map((item) => (
            <div
              onClick={() => {
                getTodoById(item.id), setSelectedUser(item);
              }}
              key={item.id}
            >
              <h5>{item.name}</h5>
            </div>
          ))}
        </div>
      )}
      {selectedUser !== null && (
        <div>
          <h3>Todo List</h3>
          {todoData.map((item) => (
            <div key={item.id}>
              <h5>{item.title}</h5>
              <p>{item.description}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
