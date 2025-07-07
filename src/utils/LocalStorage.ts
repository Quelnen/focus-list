import { TasksState } from "../store/feature/tasks/tasksSlice";

export const loadState = (): TasksState | undefined => {
  try {
    const serializedState = localStorage.getItem('tasksState');
    if (!serializedState) return undefined;
    return JSON.parse(serializedState) as TasksState;
  } catch (e) {
    console.warn("Load state error:", e);
    return undefined;
  }
};

export const saveState = (state: TasksState) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('tasksState', serializedState);
  } catch (e) {
    console.warn("Save state error:", e);
  }
};