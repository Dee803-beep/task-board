import { describe, it, expect, beforeEach } from "vitest";
import { loadBoard, saveBoard, resetBoard } from "../services/storage";

beforeEach(() => {
  localStorage.clear();
});

describe("Storage Service", () => {
  it("returns empty board when storage is empty", () => {
    const board = loadBoard();
    expect(board.Todo).toEqual([]);
    expect(board.Doing).toEqual([]);
    expect(board.Done).toEqual([]);
  });

  it("saves and loads board correctly", () => {
    const data = {
      Todo: [{ id: 1, title: "Test" }],
      Doing: [],
      Done: []
    };

    saveBoard(data);
    const loaded = loadBoard();
    expect(loaded.Todo.length).toBe(1);
    expect(loaded.Todo[0].title).toBe("Test");
  });

  it("resets board", () => {
    saveBoard({ Todo: [{}], Doing: [], Done: [] });
    resetBoard();
    const board = loadBoard();
    expect(board.Todo.length).toBe(0);
  });
});
