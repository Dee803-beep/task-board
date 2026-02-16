import { useState } from "react";
import { useTasks } from "../context/TaskContext";
import { useAuth } from "../context/AuthContext";
import Column from "../components/Column";
import TaskForm from "../components/TaskForm";
import ActivityLog from "../components/ActivityLog";
import { COLUMNS } from "../utils/constants";

export default function Board() {
  const { board, reset } = useTasks();
  const { logout } = useAuth();

  const [search, setSearch] = useState("");
  const [priorityFilter, setPriorityFilter] = useState("All");
  const [sortOrder, setSortOrder] = useState("none");

  const processTasks = (tasks) => {
    let result = [...tasks];

    // Search
    if (search) {
      result = result.filter((t) =>
        t.title.toLowerCase().includes(search.toLowerCase())
      );
    }

    // Filter
    if (priorityFilter !== "All") {
      result = result.filter((t) => t.priority === priorityFilter);
    }

    // Sort
    if (sortOrder === "due") {
      result.sort((a, b) => {
        if (!a.dueDate) return 1;
        if (!b.dueDate) return -1;
        return new Date(a.dueDate) - new Date(b.dueDate);
      });
    }

    return result;
  };

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between mb-3">
        <h2>Task Board</h2>
        <div>
          <button className="btn btn-danger me-2" onClick={logout}>
            Logout
          </button>
          <button className="btn btn-warning" onClick={reset}>
            Reset
          </button>
        </div>
      </div>

      {/* Controls */}
      <div className="row mb-3">
        <div className="col">
          <input
            className="form-control"
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="col">
          <select
            className="form-select"
            value={priorityFilter}
            onChange={(e) => setPriorityFilter(e.target.value)}
          >
            <option>All</option>
            <option>Low</option>
            <option>Medium</option>
            <option>High</option>
          </select>
        </div>

        <div className="col">
          <select
            className="form-select"
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
          >
            <option value="none">No Sort</option>
            <option value="due">Sort by Due Date</option>
          </select>
        </div>
      </div>

      <TaskForm />

      <div className="row mt-4">
        {COLUMNS.map((col) => (
          <div key={col} className="col">
            <Column title={col} tasks={processTasks(board[col])} />
          </div>
        ))}
      </div>

      <ActivityLog />
    </div>
  );
}