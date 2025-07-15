import { Task } from "../../../types";
import { useDispatch } from "react-redux";
import styles from "./TaskItem.module.scss";
import { deleteTask } from "../../../store/feature/tasks/tasksSlice";
import { TaskButton } from "../TaskButton/TaskButton";
import { Description } from "../TaskDescription/TaskDescription";
import { useDraggable } from "@dnd-kit/core";

interface TaskItemProps {
  task: Task;
  index: number;
  onEdit: () => void;
}

function TaskItem({ task, onEdit }: TaskItemProps) {
  const { attributes, listeners, setNodeRef, transform ,isDragging} = useDraggable({
    id: `${task.id}`,
  });
  const dispatch = useDispatch();

  const style = {
    transform: transform
      ? `translate(${transform.x}px, ${transform.y}px)`
      : undefined,
    opacity: isDragging ? 0.9 : 1,
    transition: "transform 0.1s ease",
    cursor: "grab",
  };

  const handleDelete = () => {
    dispatch(deleteTask(task.id));
  };

  return (
    <li
      ref={setNodeRef}
      style={style}
      className={styles.taskItem}
      {...attributes}
    >
      <div  {...listeners} className={styles.title} >{task.title}</div>
      <div className={styles.description}>
        <Description text={task.description} />
      </div>
      <div className={styles.buttonsRow}>
        <TaskButton
          label="Удалить"
          callBackFunc={handleDelete}
          variant="danger"
          onPointerDown={(e) => e.stopPropagation()}
        />
        <TaskButton
          label="Редактировать"
          callBackFunc={onEdit}
          variant="edit"
          onPointerDown={(e) => e.stopPropagation()}
        />
      </div>
    </li>
  );
}

export { TaskItem };
