import { Task } from "../../../types";
import { useDroppable } from "@dnd-kit/core";
import { TaskList } from "../../TasksList/TaskList/TaskList";
import styles from "./KanbanColumn.module.scss";

interface ColumnProps {
  title: string;
  status: string;
  tasks: Task[];
}

function KanbanColumn({ title, status, tasks }: ColumnProps) {
  const { setNodeRef, isOver } = useDroppable({
    id: status,
  });
  return (
    <li ref={setNodeRef} className={styles.column}>
      <p className={styles.title}>{title}</p>
      <TaskList tasks={tasks} className={styles.taskList}></TaskList>
    </li>
  );
}

export { KanbanColumn };
