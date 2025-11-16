import "./reset.css";
import "./App.css";
import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";
import CheckAllAndRemainingItem from "./components/CheckAllAndAndRemainingItem";
import TodoFilter from "./components/TodoFilter";
import ClearCompletedButton from "./components/ClearCompletedButton";
import { useCallback, useEffect, useState } from "react";

export default function App() {
  const [todos, setTodos] = useState([]);
  const [filterTodos, setFilterTodos] = useState(todos);
  const url = "http://localhost:5000/todos";

  useEffect(() => {
    fetch(url)
      .then((response) => response.json())
      .then((data) => setTodos(data))
      .catch((error) => console.log("Error: ", error));
  }, []);

  //Add
  const addTodo = (todo) => {
    // server
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(todo),
    });
    //client
    setTodos((prevState) => [...prevState, todo]);
  };

  //Update
  const updateTodo = (todo) => {
    //server
    fetch(`${url}/${todo.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(todo),
    });
    //client
    setTodos((prevState) => {
      return prevState.map((t) => {
        if (t.id === todo.id) {
          return todo;
        }
        return t;
      });
    });
  };

  //Delete
  const deleteTodo = (id) => {
    //server
    fetch(`${url}/${id}`, { method: "DELETE" });
    //client
    setTodos((prevState) => prevState.filter((todo) => todo.id !== id));
  };

  //check all and remaining items
  const remainingCount = todos.filter((todo) => !todo.completed).length;

  const checkAllTodos = () => {
    //server
    todos.forEach((todo) => updateTodo({ ...todo, completed: true }));
    //client
    setTodos((prevState) =>
      prevState.map((todo) => ({ ...todo, completed: true }))
    );
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
    [todos]
  );

  return (
    <div className="todo-app-container">
      <div className="todo-app">
        <h2>Todo App</h2>
        <TodoForm addTodo={addTodo} />
        <TodoList
          todos={filterTodos}
          updateTodo={updateTodo}
          deleteTodo={deleteTodo}
        />
        <CheckAllAndRemainingItem
          remainingCount={remainingCount}
          checkAllTodos={checkAllTodos}
        />
        <div className="other-buttons-container">
          <TodoFilter filterBy={filterBy} />
          <ClearCompletedButton clearCompletedTodos={clearCompletedTodos} />
        </div>
      </div>
    </div>
  );
}
