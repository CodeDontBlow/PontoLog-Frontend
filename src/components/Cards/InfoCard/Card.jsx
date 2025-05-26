import styles from "./Card.module.css"
import Skeleton from "../../Skeleton/Skeleton";

function Card({ title, fatorAgregado, produto, skeleton }) {
  if (skeleton) {
    return <Skeleton />;
  }
  return (
    <div className={styles.card}>
      <h2 className={styles.title}>{title}</h2>
      <div className={styles.line}>
          <span className={styles.label}>Principal Fator Agregado:</span>
          <span className={styles.value}>{fatorAgregado}</span>
      </div>
      <div className={styles.line}>
          <span className={styles.label}>Principal Produto:</span>
          <span className={styles.value}>{produto}</span>
      </div>
    </div>
  );
}

export default Card