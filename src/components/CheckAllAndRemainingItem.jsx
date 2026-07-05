const CheckAllAndRemainingItem = ({ remainingCount, checkAllTodos }) => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        color: "#6b7280",
        marginTop: "22px",
        paddingTop: "16px",
        borderTop: "1px solid lightgray",
      }}
    >
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
};

export default CheckAllAndRemainingItem;
