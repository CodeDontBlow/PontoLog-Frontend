import React from 'react';
import styles from './Footer.module.css';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <div className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.grouped}>
          <div className={styles.column}>
            <h4 className={styles.title}>Projeto</h4>
            <ul className={styles.list}>
              <li><a href="https://www.gov.br/mdic/pt-br/assuntos/comercio-exterior/estatisticas/base-de-dados-bruta">Dados utilizados</a></li>
              <li><a href="#">Tratamento de Dados</a></li>
              <li><a href="https://github.com/CodeDontBlow/PontoLog">Github do Projeto</a></li>
            </ul>
          </div>

          <div className={styles.column}>
            <h4 className={styles.title}>Equipe</h4>
            <ul className={styles.list}>
              <li> <Link to={'/about'}>Sobre Nós </Link></li>
              <li><a href="https://github.com/CodeDontBlow">Github da Equipe</a></li>
            </ul>
          </div>
        </div>

        <div className={styles.copyright}>
          <h4 className={styles.title}>Copyright © CodeDon’tBlow</h4>
          <p className={styles.list}>Onde cortamos o pavio dos seus problemas!</p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
