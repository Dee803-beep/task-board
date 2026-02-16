const KEY = "task_board";

export function loadBoard() {
  const saved = localStorage.getItem(KEY);
  if (!saved) {
    return { Todo: [], Doing: [], Done: [] };
  }
  return JSON.parse(saved);
}

export function saveBoard(board) {
  localStorage.setItem(KEY, JSON.stringify(board));
}

export function resetBoard() {
  localStorage.removeItem(KEY);
}
