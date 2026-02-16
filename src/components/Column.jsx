import TaskCard from "./TaskCard";
import { useTasks } from "../context/TaskContext";
import { useState } from "react";

export default function Column({ title, tasks }) {
  const { moveTask } = useTasks();
  const [isOver, setIsOver] = useState(false);

  const handleDrop = (e) => {
    const data = JSON.parse(e.dataTransfer.getData("task"));
    moveTask(data.task, data.from, title);
    setIsOver(false);
  };


     return (
    <div
      className={`card p-2 ${isOver ? "bg-light" : ""}`}
      onDragOver={(e) => e.preventDefault()}
      onDragEnter={() => setIsOver(true)}
      onDragLeave={() => setIsOver(false)}
      onDrop={handleDrop}
      style={{ minHeight: 400 }}
    >
      <h5 className="text-center">{title}</h5>
      {tasks.map((t) => (
        <TaskCard key={t.id} task={t} column={title} />
      ))}
    </div>
  );
}