// components/ConfirmModal.tsx
import React from 'react';
import styles from './confirmModal.module.css';

// Definir los tipos de las props
interface ConfirmModalProps {
  isOpen: boolean; // Si el modal está abierto o cerrado
  onConfirm: () => void; // Función que se ejecuta cuando el usuario confirma
  onCancel: () => void; // Función que se ejecuta cuando el usuario cancela
  message: string; // El mensaje que se mostrará en el modal
}

const ConfirmModal: React.FC<ConfirmModalProps> = ({ isOpen, onConfirm, onCancel, message }) => {
  if (!isOpen) return null; // Si el modal no está abierto, no se renderiza

  return (
    <div className={styles.modal}>
      <div className={styles.modalContent}>
        <p>{message}</p>
        <button className={styles.confirmBtn} onClick={onConfirm}>
          Sí
        </button>
        <button className={styles.cancelBtn} onClick={onCancel}>
          No
        </button>
      </div>
    </div>
  );
};

export default ConfirmModal;
