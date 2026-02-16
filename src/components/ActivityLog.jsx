import { useTasks } from "../context/TaskContext";

export default function ActivityLog() {
  const { log } = useTasks();

  return(
  <div className="card mt-4 p-3">
      <h5>Activity Log</h5>
      <ul className="list-group">
        {log.map((l, i) => (
          <li key={i} className="list-group-item">
            {l}
          </li>
        ))}
      </ul>
    </div>
  );
}