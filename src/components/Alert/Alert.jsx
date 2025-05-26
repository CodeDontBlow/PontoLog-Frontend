import styles from "./Alert.module.css";
import { useEffect, useState } from "react";

const Alert = ({ type = "info", message, onClose, duration = 5000 }) => {
  const validTypes = ["info", "success", "warning", "emergency"];
  const alertType = validTypes.includes(type) ? type : "info";

  const [isVisible, setIsVisible] = useState(true); // controla visibilidade do alerta

  useEffect(() => {
    if (duration > 0) {
      const timer = setTimeout(() => {
        // inicia animação fade-out
        setIsVisible(false);
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [duration]);

  // Quando a animação fade-out acabar, chama o onClose para remover o alerta
  const handleAnimationEnd = () => {
    if (!isVisible && onClose) {
      onClose();
    }
  };

  return (
    <div
      className={`${styles.alert} ${styles[alertType]} ${!isVisible ? styles.fadeOut : ""}`}
      onAnimationEnd={handleAnimationEnd}
    >
      <span>{message}</span>
      {onClose && (
        <button
          className={styles.closeButton}
          onClick={() => setIsVisible(false)} // dispara fade-out ao clicar no botão
          aria-label="Fechar alerta"
        >
          &times;
        </button>
      )}
    </div>
  );
};

export default Alert;
