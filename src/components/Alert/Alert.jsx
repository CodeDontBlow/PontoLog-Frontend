import styles from "./Alert.module.css";
import { useEffect } from "react";

const Alert = ({ type = "info", message, onClose, duration = 5000 }) => { 
  const validTypes = ["info", "success", "warning", "emergency"];
  const alertType = validTypes.includes(type) ? type : "info"; // define o tipo de alerta padrão como "info" se o tipo fornecido não for válido

  // fecha o alerta automaticamente depois de 5 segundos
  useEffect(() => {
    if (duration > 0) {
      const timer = setTimeout(() => {
        if (onClose) onClose();
      }, duration);
      return () => clearTimeout(timer); 
    }
  }, [duration, onClose]);

  return (
    <div className={`${styles.alert} ${styles[alertType]}`}>
      <span>{message}</span>
      {onClose && (
        <button className={styles.closeButton} onClick={onClose}>
          &times;
        </button>
      )}
    </div>
  );
};

export default Alert;