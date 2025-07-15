import React, { ReactNode, useState } from "react";
import { TaskItem } from "../TaskItem/TaskItem";
import { EditTask } from "../TaskEdit/TaskEdit";
import { TaskModal } from "../TaskModal/TaskModal";
import styles from "./TaskList.module.scss";
import { Task } from "../../../types";

interface TaskListProps {
  tasks: Task[];
  className?: string;
  innerRef?: (element: HTMLElement | null) => void;
  children?: ReactNode;
}

function TaskList({ tasks, className }: TaskListProps) {
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  return (
    <>
      <ul className={`${styles.taskList} ${className || ""}`}>
        {tasks.map((task,index) => (
          <TaskItem
            index = {index}
            key={task.id}
            task={task}
            onEdit={() => setEditingTask(task)}
          />
        ))}
      </ul>

      {editingTask && (
        <TaskModal onClose={() => setEditingTask(null)}>
          <EditTask task={editingTask} onClose={() => setEditingTask(null)} />
        </TaskModal>
      )}
    </>
  );
}

export { TaskList };
