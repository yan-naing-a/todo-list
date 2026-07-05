import SingleTodo from "./SingleTodo";

const TodoList = ({ todos, updateTodo, deleteTodo }) => {
  return (
    <ul style={{ marginTop: "32px" }}>
      {todos.map((todo) => {
        return (
          <SingleTodo todo={todo} updateTodo={updateTodo} deleteTodo={deleteTodo} key={todo.id} />
        );
      })}
    </ul>
  );
};

export default TodoList;
