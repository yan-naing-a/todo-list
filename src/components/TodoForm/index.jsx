import { useState } from "react";
import "./index.css";

export default function TodoForm({ addTodo }) {
  const [title, setTitle] = useState("");

  const handleAddTodo = (e) => {
    e.preventDefault();
    const newTodo = {
      id: Math.random(Math.floor() * 1000),
      title,
      completed: false,
    };

    addTodo(newTodo);
    setTitle("");
  };

  return (
    <form action="#" onSubmit={handleAddTodo}>
      <input
        type="text"
        className="todo-input"
        placeholder="What do you need to do?"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
    </form>
  );
}
