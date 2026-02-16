import { createContext, useContext, useEffect, useState } from "react";
import { loadBoard, saveBoard, resetBoard } from "../services/storage";

const TaskContext = createContext();

export function TaskProvider({ children }) {
  const [board, setBoard] = useState(loadBoard());
  const [log, setLog] = useState([]);

  useEffect(() => {
    saveBoard(board);
  }, [board]);

  const addLog = (text) => {
    setLog((prev) => [`${new Date().toLocaleTimeString()} - ${text}`, ...prev].slice(0, 5));
  };

  const addTask = (task) => {
    setBoard({
      ...board,
      Todo: [...board.Todo, task],
    });
    addLog("Task created");
  };

  const moveTask = (task, from, to) => {
    setBoard({
      ...board,
      [from]: board[from].filter((t) => t.id !== task.id),
      [to]: [...board[to], task],
    });
    addLog("Task moved");
  };

  const deleteTask = (id, column) => {
    setBoard({
      ...board,
      [column]: board[column].filter((t) => t.id !== id),
    });
    addLog("Task deleted");
  };

  const editTask = (updatedTask, column) => {
    setBoard({
      ...board,
      [column]: board[column].map((t) =>
        t.id === updatedTask.id ? updatedTask : t
      ),
    });
    addLog("Task edited");
  };

  const reset = () => {
    if (confirm("Reset board?")) {
      resetBoard();
      setBoard(loadBoard());
      setLog([]);
    }
  };

  return (
    <TaskContext.Provider
      value={{ board, addTask, moveTask, deleteTask, editTask, log, reset }}
    >
      {children}
    </TaskContext.Provider>
  );
}

export const useTasks = () => useContext(TaskContext);
