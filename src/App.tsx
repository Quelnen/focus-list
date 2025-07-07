import React from "react";
import { TaskList } from "./components/TasksList/TaskList/TaskList";
import { TaskForm } from "./components/TaskForm/Todo-form";
import { TaskFilter } from "./components/TaskFilter/TaskFilter";

function App() {
  return (
    <div className="App">
      <section>
        <TaskForm />
      </section>
      <section>
        <TaskFilter />
      </section>
      <section>
        <TaskList />
      </section>
    </div>
  );
}

export default App;
