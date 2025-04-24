import React, { useState } from "react";
import styles from "./Tooltip.module.css";
import Button from "../Buttons/Button/Button";

const Tooltip = ({
  variant,
  content,
  onClick,
  buttonVariant = "Btn-lbl",
  buttonLabel,
  position = "top", // posição padrão do tooltip
}) => {
  const [isVisible, setIsVisible] = useState(false);

  const getButtonText = () => {
    return buttonLabel || "Ok"; //"Ok" como padrão
  };

  const handleMouseEnter = () => {
    setIsVisible(true);
  };

  const handleMouseLeave = () => {
    setIsVisible(false);
  };

  const handleButtonClick = () => {
    setIsVisible(false);
    if (onClick) onClick();
  };

  const handleCloseClick = () => {
    setIsVisible(false);
  };

  return (
    <div
      className={styles.tooltipWrapper}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div
        className={`${styles.tooltip} ${
          isVisible ? styles.visible : styles.hidden
        } ${styles[position]}`} // adiciona dinamicamente uma classe CSS com base no valor da prop position
      >
        <div className={`${styles.tooltipArrow} ${styles[`arrow-${position}`]}`}></div> {/* triângulozinho da tooltip */}
        <div className={styles.tooltipContent}>
          {content}
          {variant === "withButton" && (
            <Button onClick={handleButtonClick} variant={buttonVariant} label={buttonLabel}>
              {getButtonText()}
            </Button>
          )}
          <button
            className={styles.closeButton}
            onClick={handleCloseClick}
            aria-label="Close Tooltip"
          >
            ✕
          </button>
        </div>
      </div>
    </div>
  );
};

export default Tooltip;