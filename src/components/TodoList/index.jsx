import { useState } from "react";
import "./index.css";
import SingleTodo from "../SingleTodo";

export default function TodoList({ todos, updateTodo, deleteTodo }) {
  return (
    <ul className="todo-list">
      {todos.map((todo) => {
        return (
          <SingleTodo
            todo={todo}
            updateTodo={updateTodo}
            deleteTodo={deleteTodo}
            key={todo.id}
          />
        );
      })}
    </ul>
  );
}
