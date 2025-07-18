import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store";
import { KanbanColumn } from "../KanbanColumn/KanbanColumn";
import { TaskButton } from "../../TasksList/TaskButton/TaskButton";
import { TaskModal } from "../../TasksList/TaskModal/TaskModal";
import { TaskForm } from "../../TasksList/TaskForm/Todo-form";
import { DndContext } from "@dnd-kit/core";
import styles from "./KanbanBoard.module.scss";
import { updateTask } from "../../../store/feature/tasks/tasksSlice";
import { KanbanSearch } from "../KanbanSearch/KanbanSearch";

function KanbanBoard() {
  const dispatch = useDispatch();
  let tasks = useSelector((state: RootState) => state.tasks.tasks);
  let [filteredTasks, setFilteredTasks] = useState(tasks);
  const searchQuery = useSelector(
    (state: RootState) => state.tasks.searchQuery
  );
  const [modalToggle, setModal] = useState(false);
  const columns = [
    { title: "Активные", status: "active" },
    { title: "Выполненные", status: "done" },
    { title: "Отложено", status: "pending" },
  ];

  function buttonHandler() {
    setModal((prev) => !prev);
  }

  function onDragEnd(id: string, overId: string | null) {
    if (overId) {
      const task = tasks.find((t) => t.id === id);
      if (task && task.status !== overId) {
        dispatch(updateTask({ ...task, status: overId }));
      }
      return `Draggable item was dropped over droppable area ${overId}`;
    }
    return `Draggable item ${id} was dropped.`;
  }

  useEffect(() => {
    let query = searchQuery.trim().toLowerCase();
    if (query) {
      setFilteredTasks(
        tasks.filter((f) => f.title.toLowerCase().includes(query))
      );
    } else {
      setFilteredTasks(tasks);
    }
  }, [searchQuery, tasks]);

  return (
    <div className={styles.page__wrapper}>
      <DndContext
        onDragEnd={({ active, over }) => {
          const id = active.id;
          const overId = over ? over.id : null;
          onDragEnd(String(id), String(overId));
        }}
      >
        <section className={styles.search_wrapper}>
          <KanbanSearch type={"search"}></KanbanSearch>
        </section>
        <section className={styles.buttons__wrapper}>
          <div className={styles.button}>
            <TaskButton
              label="+Задача"
              callBackFunc={() => buttonHandler()}
            ></TaskButton>
          </div>
        </section>
        <div className={styles.board}>
          {modalToggle && (
            <TaskModal onClose={buttonHandler}>
              <TaskForm></TaskForm>
            </TaskModal>
          )}
          {columns.map((col) => (
            <KanbanColumn
              key={col.status}
              title={col.title}
              status={col.status}
              tasks={filteredTasks.filter((task) => task.status === col.status)}
            />
          ))}
        </div>
      </DndContext>
    </div>
  );
}

export default KanbanBoard;
