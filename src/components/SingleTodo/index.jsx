import { useState } from "react";
import "./index.css";

export default function SingleTodo({ todo, updateTodo }) {
  const [isEdit, setIsEdit] = useState(false);
  const [title, setTitle] = useState(todo.title);

  const handleUpdateTodo = (e) => {
    e.preventDefault(); //prevent page reload
    const updatedTodo = {
      id: todo.id,
      title,
      completed: todo.completed,
    };
    updateTodo(updatedTodo);
    setIsEdit(false);
  };

  return (
    <li className="todo-item-container">
      <div className="todo-item">
        <input type="checkbox" />
        {!isEdit && (
          <span
            className={`todo-item-label ${
              todo.completed ? "line-through" : ""
            }`}
            onDoubleClick={() => setIsEdit(true)}
          >
            {todo.title}
          </span>
        )}
        {isEdit && (
          <form action="#" onSubmit={handleUpdateTodo}>
            <input
              type="text"
              className="todo-item-input"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </form>
        )}
      </div>
      <button className="x-button">
        <svg
          className="x-button-icon"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
    </li>
  );
}
