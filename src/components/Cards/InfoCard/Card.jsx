import { useEffect, useState } from "react";

import styles from "./Card.module.css"
import Skeleton from "../../Skeleton/Skeleton";

function Card({ title, fatorAgregado, produto, skeleton }) {
  const [fatorTranslated, setFatorTranslated] = useState('');
 
  useEffect(() => {
    if (fatorAgregado) {
      const valor = Number(fatorAgregado);
      if (valor <= 3) {
        setFatorTranslated('Pouco Manufaturado');
      } else if (valor > 3 && valor <= 7) {
        setFatorTranslated('Médio Manufaturado');
      } else if (valor > 7) {
        setFatorTranslated('Muito Manufaturado');
      };
    };
  }, [fatorAgregado]);
  
  if (skeleton) {
    return <Skeleton />;
  }

  return (
    <div className={styles.card}>
      <h2 className={styles.title}>{title}</h2>
      <div className={styles.line}>
        <span className={styles.label}>Principal Fator Agregado:</span>
        <span className={styles.value}>{fatorTranslated}</span>
      </div>
      <div className={styles.line}>
        <span className={styles.label}>Principal Produto:</span>
        <span className={styles.value}>{produto}</span>
      </div>
    </div>
  );
}

export default Card