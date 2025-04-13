import React from "react";
import { useDrag } from "react-dnd";

function TaskItem({ task, onDelete, onUpdateStatus }) {
  const [{ isDragging }, drag] = useDrag({
    type: "task",
    item: task,
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });
  return (
    <div
      ref={drag}
      className="task-item"
      style={{
        opacity: isDragging ? 0.5 : 1,
        border: "1px solid #ccc",
        padding: "10px",
        margin: "10px",
        borderRadius: "4px",
        backgroundColor: "#f9f9f9",
      }}
    >
      <div>
        <div>
          <strong>Task Name:</strong> {task.name} |
          <strong> Task Description:</strong> {task.description}
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <p>
            <strong> Task Assign Name:</strong> {task.assignName}
          </p>
          {task.status == "Pending" && (
            <button
              onClick={() => {
                onDelete(task._id);
              }}
            >
              Delete
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default TaskItem;
