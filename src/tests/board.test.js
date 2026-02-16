import { describe, it, expect } from "vitest";

describe("Board logic", () => {
  it("moves task between columns", () => {
    const board = {
      Todo: [{ id: 1, title: "Task" }],
      Doing: [],
      Done: []
    };

    const task = board.Todo[0];

    const newBoard = {
      ...board,
      Todo: board.Todo.filter((t) => t.id !== task.id),
      Doing: [...board.Doing, task]
    };

    expect(newBoard.Todo.length).toBe(0);
    expect(newBoard.Doing.length).toBe(1);
  });
});
