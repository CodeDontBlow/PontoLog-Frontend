import React from "react";
import styles from "./Alert.module.css"; 

const Alert = ({ type = "info", message }) => {
  const validTypes = ["info", "success", "warning", "error"];
  const alertType = validTypes.includes(type) ? type : "info";

  return (
    <div className={`${styles.alert} ${styles[alertType]}`}>
      {message}
    </div>
  );
};

export default Alert;