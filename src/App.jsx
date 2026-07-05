import { useCallback, useEffect, useState } from "react";
import "./App.css";
import CheckAllAndRemainingItem from "./components/CheckAllAndRemainingItem";
import ClearCompletedButton from "./components/ClearCompletedButton";
import TodoFilter from "./components/TodoFilter";
import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";
import config from "./config";
import "./reset.css";

export default function App() {
  const [todos, setTodos] = useState([]);
  const [filterTodos, setFilterTodos] = useState(todos);

  useEffect(() => {
    fetch(config.apiBaseUrl)
      .then((response) => response.json())
      .then((data) => setTodos(data))
      .catch((error) => console.log("Error: ", error));
  }, []);

  //Add
  const addTodo = (todo) => {
    // server
    fetch(config.apiBaseUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(todo),
    });
    //client
    setTodos((prevState) => [...prevState, todo]);
  };

  //Update
  const updateTodo = (todo) => {
    //server
    fetch(`${config.apiBaseUrl}/${todo.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(todo),
    });
    //client
    setTodos((prevState) => prevState.map((t) => (t.id === todo.id ? todo : t)));
  };

  //Delete
  const deleteTodo = (id) => {
    //server
    fetch(`${config.apiBaseUrl}/${id}`, { method: "DELETE" });
    //client
    setTodos((prevState) => prevState.filter((todo) => todo.id !== id));
  };

  //check all and remaining items
  const remainingCount = todos.filter((todo) => !todo.completed).length;

  const checkAllTodos = () => {
    //server
    todos.forEach((todo) => updateTodo({ ...todo, completed: true }));
    //client
    setTodos((prevState) => prevState.map((todo) => ({ ...todo, completed: true })));
  };

  //clear completed
  const clearCompletedTodos = () => {
    //server
    todos.forEach((todo) => todo.completed && deleteTodo(todo.id));
    //client
    setTodos((prevState) => prevState.filter((todo) => !todo.completed));
  };

  //todo filter
  const filterBy = useCallback(
    (filter) => {
      if (filter === "All") {
        setFilterTodos(todos);
      } else if (filter === "Active") {
        setFilterTodos(todos.filter((todo) => !todo.completed));
      } else if (filter === "Completed") {
        setFilterTodos(todos.filter((todo) => todo.completed));
      }
    },
    [todos],
  );

  return (
    <div className="todo-app-container">
      <div className="todo-app">
        <h1 style={{ fontSize: "30px", color: "steelblue" }}>Todo App</h1>
        <TodoForm addTodo={addTodo} />
        <TodoList todos={filterTodos} updateTodo={updateTodo} deleteTodo={deleteTodo} />
        <CheckAllAndRemainingItem remainingCount={remainingCount} checkAllTodos={checkAllTodos} />
        <div className="other-buttons-container">
          <TodoFilter filterBy={filterBy} />
          <ClearCompletedButton clearCompletedTodos={clearCompletedTodos} />
        </div>
      </div>
    </div>
  );
}
