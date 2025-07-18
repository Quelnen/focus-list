import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Task } from "../../../types";

export interface TasksState {
  tasks: Task[];
  filter: "all" | "active" | "done" | "pending";
  searchQuery: string;
}

const initialState: TasksState = {
  tasks: [],
  filter: "all",
  searchQuery: "",
};

const tasksSlice = createSlice({
  name: "tasks",
  initialState: initialState,
  reducers: {
    addTask(state, action: PayloadAction<Task>) {
      state.tasks.push(action.payload);
    },
    deleteTask(state, action: PayloadAction<string>) {
      state.tasks = state.tasks.filter((task) => task.id !== action.payload);
    },
    setFilter(
      state,
      action: PayloadAction<"all" | "active" | "done" | "pending">
    ) {
      state.filter = action.payload;
    },
    updateTask(state, action: PayloadAction<Task>) {
      const index = state.tasks.findIndex((t) => t.id === action.payload.id);
      if (index !== -1) {
        state.tasks[index] = action.payload;
      }
    },
    setSearchQuery(state, action: PayloadAction<string>) {
      state.searchQuery = action.payload;
    },
  },
});

export const { addTask, deleteTask, setFilter, updateTask ,setSearchQuery} =
  tasksSlice.actions;
export default tasksSlice.reducer;
