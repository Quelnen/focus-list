import styles from "./TaskButton.module.scss";

interface DeleteButtonProps {
  label: string;
  callBackFunc: () => void;
  variant?: "default" | "danger" | "edit";
  onPointerDown?: React.PointerEventHandler<HTMLButtonElement>;
}

function TaskButton({
  label,
  callBackFunc,
  variant = "default",
}: DeleteButtonProps) {
  return (
    <button
      className={`${styles.button} ${styles[variant]}`}
      onClick={callBackFunc}
    >
      {label}
    </button>
  );
}

export { TaskButton };
