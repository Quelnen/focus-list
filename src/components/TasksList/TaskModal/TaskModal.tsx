import React from 'react';
import styles from './TaskModal.module.scss';


interface ModalProps {
  onClose: () => void;
  children: React.ReactNode;
}

function Modal({ children, onClose }: ModalProps) {
  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div
        className={styles.modalContent}
        onClick={e => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
}

export default Modal;