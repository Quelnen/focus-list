import { Task } from '../../../types';
import { useDispatch } from 'react-redux';
import styles from './TaskItem.module.scss';
import { deleteTask } from '../../../store/feature/tasks/tasksSlice';
import { TaskButton } from '../TaskButton/TaskButton';
import { Description } from '../TaskDescription/TaskDescription';

interface TaskItemProps {
  task: Task;
  onEdit: () => void;
}

function TaskItem({ task, onEdit }: TaskItemProps) {
  const dispatch = useDispatch();

  const handleDelete = () => {
    dispatch(deleteTask(task.id));
  };

  return (
    <li className={styles.taskItem}>
      <div className={styles.title}>{task.title}</div>
      <div className={styles.description}>
        <Description text={task.description} />
      </div>
      <div className={styles.bottomRow}>
        <div className={styles.status}>
          {task.status === 'done' ? 'Выполнено' : 'В процессе'}
        </div>
        <div className={styles.buttonsRow}>
          <TaskButton label="Удалить" onDelete={handleDelete} variant="danger" />
          <TaskButton label="Редактировать" onDelete={onEdit} variant="edit" />
        </div>
      </div>
    </li>
  );
}

export { TaskItem };
