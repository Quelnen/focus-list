import { configureStore } from '@reduxjs/toolkit';
import tasksReducer from './feature/tasks/tasksSlice';
import { loadState, saveState } from '../utils/LocalStorage';

const persistedTasks = loadState();

export const store = configureStore({
  reducer: {
    tasks: tasksReducer,
  },
  preloadedState: {
    tasks: persistedTasks ?? { tasks: [], filter: 'all' ,searchQuery:""},
  },
});

store.subscribe(() => {
  saveState(store.getState().tasks);
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;