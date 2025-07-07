import React, { useState } from 'react';
import { Task } from '../../../types';
import { useDispatch } from 'react-redux';
import { updateTask } from '../../../store/feature/tasks/tasksSlice';
import styles from './TaskEdit.module.scss';

interface EditTaskProps {
  task: Task;
  onClose: () => void;
}

export const EditTask: React.FC<EditTaskProps> = ({ task, onClose }) => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);
  const [status, setStatus] = useState(task.status);

  const handleSave = () => {
    dispatch(updateTask({ ...task, title, description, status }));
    onClose();
  };

  return (
    <form className={styles.editTask} onSubmit={e => { e.preventDefault(); handleSave(); }}>
      <input
        className={styles.input}
        value={title}
        onChange={e => setTitle(e.target.value)}
        placeholder="Название задачи"
        required
      />
      <textarea
        className={styles.textarea}
        value={description}
        onChange={e => setDescription(e.target.value)}
        placeholder="Описание задачи"
      />
      <select
        className={styles.select}
        value={status}
        onChange={e => setStatus(e.target.value)}
      >
        <option value="active">В процессе</option>
        <option value="done">Выполнена</option>
      </select>
      <div className={styles.buttons}>
        <button type="submit" className={`${styles.button} ${styles.save}`}>
          Сохранить
        </button>
        <button
          type="button"
          className={`${styles.button} ${styles.cancel}`}
          onClick={onClose}
        >
          Отмена
        </button>
      </div>
    </form>
  );
};


interface EditTaskProps {
  task: Task;
  onClose: () => void;
}
