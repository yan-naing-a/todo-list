import "./index.css";

export default function CheckAllAndRemainingItem({
  remainingCount,
  checkAllTodos,
}) {
  return (
    <div className="check-all-container">
      <div>
        <div className="button" onClick={checkAllTodos}>
          Check All
        </div>
      </div>

      <span>
        {remainingCount} item{remainingCount > 1 ? "s" : ""} remaining
      </span>
    </div>
  );
}
