import "./reset.css";
import "./App.css";
import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";
import CheckAllAndRemainingItem from "./components/CheckAllAndAndRemainingItem";
import TodoFilter from "./components/TodoFilter";
import ClearCompletedButton from "./components/ClearCompletedButton";
import { useEffect, useState } from "react";

export default function App() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/todos")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setTodos(data);
      })
      .catch((error) => console.log("Error: ", error));
  }, []);

  //Add
  const addTodo = (todo) => {
    // server
    fetch("http://localhost:5000/todos", {
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
    fetch(`http://localhost:5000/todos/${todo.id}`, {
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

  const deleteTodo = (id) => {
    //server
    //client
    setTodos((prevState) => prevState.filter((todo) => todo.id !== id));
  };

  return (
    <div className="todo-app-container">
      <div className="todo-app">
        <h2>Todo App</h2>
        {/* todo form */}
        <TodoForm addTodo={addTodo} />
        {/* todo lists */}
        <TodoList
          todos={todos}
          updateTodo={updateTodo}
          deleteTodo={deleteTodo}
        />
        {/* check all and remaining items */}
        <CheckAllAndRemainingItem />

        <div className="other-buttons-container">
          {/* todos filter*/}
          <TodoFilter />
          {/* clear completed button */}
          <ClearCompletedButton />
        </div>
      </div>
    </div>
  );
}
