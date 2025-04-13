import React from "react";
import { useDrag, useDrop } from "react-dnd";
import TaskItem from "./TaskItem";

function TaskColumn({ title, tasks, onDelete, onUpdateStatus, column }) {
  const [, drop] = useDrop({
    accept: "task",
    drop: (item) => onUpdateStatus(item._id, column),
  });
  return (
    <div ref={drop} className="task-column">
      <h2>{title}</h2>
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onDelete={onDelete}
          onUpdateStatus={onUpdateStatus}
        />
      ))}
    </div>
  );
}

export default TaskColumn;
