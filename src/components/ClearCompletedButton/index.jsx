import "./index.css";

export default function ClearCompletedButton({ clearCompletedTodos }) {
  return (
    <div>
      <button className="button" onClick={clearCompletedTodos}>
        Clear completed
      </button>
    </div>
  );
}
