import styles from "./TaskButton.module.scss";

interface DeleteButtonProps {
  label: string;
  onDelete: () => void;
    variant?: 'default' | 'danger' | 'edit';
}

function TaskButton({ label, onDelete, variant = 'default' }: DeleteButtonProps) {
  return (
    <button       className={`${styles.button} ${styles[variant]}`} onClick={onDelete}>
      {label}
    </button>
  );
}

export { TaskButton };