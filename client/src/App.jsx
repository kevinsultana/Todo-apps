import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { BaseApi } from "./Api/BaseApi";

function App() {
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

  useEffect(() => {
    getUser();
  }, []);

  return (
    <div>
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

export default App;
