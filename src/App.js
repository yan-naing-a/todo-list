import "./reset.css";
import "./App.css";
import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";
import CheckAllAndRemainingItem from "./components/CheckAllAndAndRemainingItem";
import TodoFilter from "./components/TodoFilter";
import ClearCompletedButton from "./components/ClearCompletedButton";

export default function App() {
  return (
    <div className="todo-app-container">
      <div className="todo-app">
        <h2>Todo App</h2>
        {/* todo form */}
        <TodoForm />
        {/* todo lists */}
        <TodoList />
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
