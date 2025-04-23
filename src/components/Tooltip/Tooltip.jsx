import styles from "./Tooltip.module.css"; 

const Tooltip = ({variant, content, onClick, buttonType = "default", buttonLabel,}) => {
  const getButtonText = () => {
    if (buttonLabel) return buttonLabel;
    switch (buttonType) {
      case "fechar":
        return "Fechar";
      default:
        return "Ok";
    }
  };

  return (
    <div className={styles.tooltip}> {/* Use styles.nomeDaClasse */}
      {content}
      {variant === "withButton" && (
        <button className={styles.button} onClick={onClick}>
          {getButtonText()}
        </button>
      )}
    </div>
  );
};

export default Tooltip;