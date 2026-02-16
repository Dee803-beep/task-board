import { useState } from "react";
import { useTasks } from "../context/TaskContext";
import TaskForm from "./TaskForm";

export default function TaskCard({ task, column }) {
  const { deleteTask } = useTasks();
  const [editing, setEditing] = useState(false);

  const handleDragStart = (e) => {
    e.dataTransfer.setData("task", JSON.stringify({ task, from: column }));
  };

  if (editing) {
    return (
      <TaskForm
        existing={task}
        column={column}
        onClose={() => setEditing(false)}
      />
    );
  }

  return (
    <div
      draggable
      onDragStart={handleDragStart}
      className="card mb-2 p-2 shadow-sm"
    >
      <strong>{task.title}</strong>
      <small>{task.description}</small>
      <div className="mt-1">
        <span className="badge bg-info me-1">
          {task.priority}
        </span>
        {task.tags?.map((t) => (
          <span key={t} className="badge bg-secondary me-1">
            {t}
          </span>
        ))}
      </div>

      <div className="mt-2">
        <button
          className="btn btn-sm btn-primary me-2"
          onClick={() => setEditing(true)}
        >
          Edit
        </button>
        <button
          className="btn btn-sm btn-danger"
          onClick={() => deleteTask(task.id, column)}
        >
          Delete
        </button>
      </div>
    </div>
  );
}