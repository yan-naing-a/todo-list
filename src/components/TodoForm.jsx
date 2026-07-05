import { useState } from "react";

const TodoForm = ({ addTodo }) => {
  const [title, setTitle] = useState("");

  const handleAddTodo = (e) => {
    e.preventDefault();
    const newTodo = {
      id: Date.now().toString(),
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
        style={{
          width: "100%",
          border: "none",
          boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)",
          padding: "14px",
          fontSize: "16px",
          marginTop: "16px",
        }}
        placeholder="What do you need to do?"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
    </form>
  );
};

export default TodoForm;
