import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addTask } from "../../../store/feature/tasks/tasksSlice";
import { Task } from "../../../types";
import styles from "./TaskForm.module.scss";

function TaskForm() {
  const dispatch = useDispatch();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState<"active" | "done" | "pending">("active");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim()) {
      alert("Введите заголовок задачи");
      return;
    }

    const newTask: Task = {
      id: Date.now().toString(),
      title,
      description,
      status,
    };

    dispatch(addTask(newTask));
    setTitle("");
    setDescription("");
    setStatus("active");
  };

  return (
    <form className={styles.formContainer} onSubmit={handleSubmit}>
      <input
        className={styles.input}
        type="text"
        placeholder="Заголовок задачи"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        className={styles.input}
        placeholder="Описание задачи"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <select
        className={styles.input}
        value={status}
        onChange={(e) => setStatus(e.target.value as "active" | "done")}
      >
        <option value="active">В процессе</option>
        <option value="done">Выполнено</option>
        <option value="pending">Отложенно</option>
      </select>
      <button type="submit" className={styles.submitButton}>
        Добавить задачу
      </button>
    </form>
  );
}

export { TaskForm };
