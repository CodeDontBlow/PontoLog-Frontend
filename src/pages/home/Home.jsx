import Sidebar from '../../components/Sidebar/Sidebar'; 
import Footer from '../../components/Footer/Footer';
import Button from '../../components/Buttons/Button/Button';
import styles from './Home.module.css';
import IconTitle from '../../components/IconTitle/IconTitle';
import { faMagnifyingGlass, faNewspaper } from "@fortawesome/free-solid-svg-icons";

import Carrossel from './Carrossel';

const Home = () => {
    return (
        <div className={styles.pageContainer}>
            <div className={styles.header}>
                <img src="src/assets/images/home/HEADER.svg" alt="Header" className={styles.headerImagem} />
            </div>
            <div className={styles.homeContainer}>
                {/* sobre a PontoLog */}
                <section className={styles.section}>
                    <div className={styles.titleContainer}>
                        <h2 className={styles.title}>
                            <img
                                src="src/assets/logos/LOGOSVG_BASEPINK.svg"
                                alt="Logo PontoLog"
                                className={styles.customIcon}
                            />
                            Sobre a PontoLog
                        </h2>
                    </div>
                    <div className={styles.conteudoLinha}>
                        <p className={styles.text}>
                            No cenário globalizado de hoje, a logística internacional é a chave para expandir mercados e impulsionar negócios.
                        </p>
                        <p className={styles.text}>
                            Por isso, use a <strong>PontoLog</strong> e faça análises melhores e mais rápidas!
                        </p>
                        <p className={styles.text}>
                            Acompanhando tendências, analise concorrentes e explore novas oportunidades no mercado global de forma simples e eficiente. Ao centralizar todas as informações em um único ambiente digital, ajudamos <strong>você</strong> e a <strong>sua empresa</strong> a reduzir incertezas e otimizar processos.
                        </p>
                    </div>
                </section>

                {/* subtópicos filtros e funcionalidades */}
                <section className={styles.subtopicsRow}>
                    {/* filtros */}
                    <div className={styles.subtopic}>
                        <div className={styles.titleContainer}>
                            <h2 className={styles.subtopicTitle}>
                                <IconTitle icon={faMagnifyingGlass} size="large" />
                                Filtros
                            </h2>
                        </div>
                        <div className={styles.conteudoLinha}>
                            <div className={styles.imagemLado}>
                                <img src="src/assets/GIF/home1filtro.gif" alt="Filtros" className={styles.image} />
                            </div>
                            <div className={styles.textContainer}>
                                <p className={styles.text}>
                                    Oferecemos Filtros para buscas específicas: um campo de Pesquisa por SH4 ou SH6, um Filtro Temporal para anos específicos e um Filtro de Estados interativo para selecionar regiões do Brasil.
                                </p>
                            </div>
                        </div>
                    </div>
                    {/* funcionalidades */}
                    <div className={styles.subtopic}>
                        <div className={styles.titleContainer}>
                            <h2 className={styles.subtopicTitle}>
                                <IconTitle variant="lineChart" size="large" />
                                Funcionalidades
                            </h2>
                        </div>
                        <div className={styles.conteudoLinha}>
                            <div className={styles.textContainer}>
                                <p className={styles.text}>
                                    Explore funcionalidades que melhoram sua experiência, como o Mapa de Principais Países, que destaca os mercados fornecedores, facilitando decisões de importação.
                                </p>
                            </div>
                            <div className={styles.imagemLado}>
                                <img src="src/assets/GIF/home2funcionalidades.gif" alt="Funcionalidades" className={styles.image} />
                            </div>
                        </div>
                    </div>
                </section>

                {/* ferramenta de comparação */}
                <div className={styles.comparisonCard}>
                  <div className={styles.titleContainer}>
                    <h2 className={styles.subtopicTitle}>
                      <IconTitle variant="barChart" size="large" />
                      Ferramenta de Comparação
                    </h2>
                  </div>
                  <div className={styles.conteudoLinha}>
                    <div className={styles.textContainer}>
                      <p className={styles.text}>
                        Os preços e condições dos produtos variam entre estados devido a impostos, disponibilidade e regulamentações locais. Com nossa ferramenta de comparação, você pode avaliar produtos em diferentes estados, facilitando decisões informadas. Selecione um produto e os estados desejados para obter um panorama completo do mercado.
                        <br /><br />
                      </p>
                      <Button label="Comparar" onClick={() => window.location.href = '/comparison'} />
                    </div>
                    <div className={styles.imagemLado}>
                      <img
                        src="src/assets/img/comparison-example.png"
                        alt="Exemplo de Comparação"
                        className={styles.image}
                      />
                    </div>
                  </div>
                </div>

                {/* últimas notícias */}
                <section className={styles.section}>
                    <div className={styles.titleContainer}>
                        <h2 className={styles.title}>
                            <IconTitle icon={faNewspaper} size="large" />
                            Últimas Notícias
                        </h2>
                    </div>
                    <Carrossel />
                </section>

                {/* seção página estatísticas */}
                <section className={styles.sectionButton}>
                    <p className={styles.text}>
                        Pronto para realizar a sua análise e descobrir o que a PontoLog pode te oferecer?
                        <br />
                        Clique no botão abaixo e você será redirecionado para a <strong>Página de Estatísticas</strong>
                    </p>
                    <Button
                        label="Começar Análise"
                        onClick={() => window.location.href = '/statistics'}
                        className={styles.ctaButton}
                    />
                </section>
            </div>
        </div>
    );
};

export default Home;