import { useState } from "react";
import { useTasks } from "../context/TaskContext";

export default function TaskForm({ existing, column, onClose }) {
  const { addTask, editTask } = useTasks();

  const [title, setTitle] = useState(existing?.title || "");
  const [desc, setDesc] = useState(existing?.description || "");
  const [priority, setPriority] = useState(existing?.priority || "Low");
  const [due, setDue] = useState(existing?.dueDate || "");
  const [tags, setTags] = useState(existing?.tags?.join(",") || "");

  const submit = (e) => {
    e.preventDefault();

    const task = {
      id: existing?.id || Date.now(),
      title,
      description: desc,
      priority,
      dueDate: due,
      tags: tags.split(",").map((t) => t.trim()),
      createdAt: existing?.createdAt || new Date().toISOString(),
    };

    if (existing) {
      editTask(task, column);
      onClose();
    } else {
      addTask(task);
    }

    if (!existing) {
      setTitle("");
      setDesc("");
      setPriority("Low");
      setDue("");
      setTags("");
    }
  };

  return (
    <form className="card p-3 mb-3" onSubmit={submit}>
      <input className="form-control mb-2" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} required />
      <textarea className="form-control mb-2" placeholder="Description" value={desc} onChange={(e) => setDesc(e.target.value)} />
      <select className="form-select mb-2" value={priority} onChange={(e) => setPriority(e.target.value)}>
        <option>Low</option>
        <option>Medium</option>
        <option>High</option>
      </select>
      <input type="date" className="form-control mb-2" value={due} onChange={(e) => setDue(e.target.value)} />
      <input className="form-control mb-2" placeholder="Tags" value={tags} onChange={(e) => setTags(e.target.value)} />
      <button className="btn btn-success">
        {existing ? "Update" : "Add"} Task
      </button>
    </form>
  );
}