const ClearCompletedButton = ({ clearCompletedTodos }) => {
  return (
    <div>
      <button className="button" onClick={clearCompletedTodos}>
        Clear completed
      </button>
    </div>
  );
};

export default ClearCompletedButton;
