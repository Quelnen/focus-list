import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store";
import { KanbanColumn } from "../KanbanColumn/KanbanColumn";
import { TaskButton } from "../../TasksList/TaskButton/TaskButton";
import { TaskModal } from "../../TasksList/TaskModal/TaskModal";
import { TaskForm } from "../../TasksList/TaskForm/Todo-form";
import { DndContext } from "@dnd-kit/core";
import styles from "./KanbanBoard.module.scss";
import { updateTask } from "../../../store/feature/tasks/tasksSlice";

function KanbanBoard() {
  const dispatch = useDispatch();
  const tasks = useSelector((state: RootState) => state.tasks.tasks);
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

  return (
    <DndContext
      onDragEnd={({ active, over }) => {
        const id = active.id;
        const overId = over ? over.id : null;
        onDragEnd(String(id), String(overId));
      }}
    >
      <div className={styles.button}>
        <TaskButton
          label="+Задача"
          callBackFunc={() => buttonHandler()}
        ></TaskButton>
      </div>
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
            tasks={tasks.filter((task) => task.status === col.status)}
          />
        ))}
      </div>
    </DndContext>
  );
}

export default KanbanBoard;
