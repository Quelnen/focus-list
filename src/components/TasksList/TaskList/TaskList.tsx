import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store';
import { TaskItem } from '../TaskItem/TaskItem';
import { EditTask } from '../TaskEdit/TaskEdit';
import Modal from '../TaskModal/TaskModal';
import styles from './TaskList.module.scss';
import { Task } from '../../../types';

function TaskList() {
  const tasks = useSelector((state: RootState) => state.tasks.tasks);
  const filter = useSelector((state: RootState) => state.tasks.filter);

  const [editingTask, setEditingTask] = useState<Task | null>(null);

  const filteredTasks = tasks.filter(task => {
    if (filter === 'all') return true;
    return task.status === filter;
  });

  return (
    <>
      <ul className={styles.taskList}>
        {filteredTasks.map(task => (
          <TaskItem
            key={task.id}
            task={task}
            onEdit={() => setEditingTask(task)}
          />
        ))}
      </ul>

      {editingTask && (
        <Modal onClose={() => setEditingTask(null)}>
          <EditTask
            task={editingTask}
            onClose={() => setEditingTask(null)}
          />
        </Modal>
      )}
    </>
  );
}

export { TaskList };
