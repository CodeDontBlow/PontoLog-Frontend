import Sidebar from '../../components/Sidebar/Sidebar'; 
import Footer from '../../components/Footer/Footer';
import Button from '../../components/Buttons/Button/Button'; 
import styles from './Home.module.css';
import IconTitle from '../../components/IconTitle/IconTitle';
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

const Home = () => {
    return (
                <div className={styles.pageContainer}>
                    <div className={styles.header}>
                        <img src="src/assets/images/home/HEADER.svg" alt="Header" className={styles.headerImagem} />
                    </div>

                    <div className={styles.homeContainer}>
                        {/* seção "Sobre a PontoLog" */}
                        <section className={styles.section}>
                            <div className={styles.titleContainer}>
                                <h2 className={styles.title}>
                                    {/* ícone SVG PontoLog */}
                                    <img
                                        src="src/assets/logos/LOGOSVG.svg"
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
                        
                        {/* seção "Filtro" */}
                        <section className={styles.section}>
                            <div className={styles.titleContainer}>
                                <h2 className={styles.title}>
                                    <IconTitle
                                        icon={faMagnifyingGlass}
                                        size="large"
                                    />
                                    Filtros
                                </h2>
                            </div>
                            <div className={styles.conteudoLinha}>
                                <div className={styles.imagemLado}>
                                    <img src="src\assets\GIF\home1filtro.gif" alt="Filtros" className={styles.image} />
                                </div>
                                <div className={styles.textContainer}>
                                    <p className={styles.text}>
                                        Para maior especificidade dos dados, possuímos diversos <strong>Filtros</strong>, que permitem a busca por dados relevantes.
                                        <br /><br />
                                        Disponibilizamos um campo de <strong>Pesquisa para Produtos</strong>, com buscas por SH4 ou SH6. Também oferecemos um <strong>Filtro Temporal</strong>, que te permite analisar dados de um único ano ou a um intervalo entre anos.
                                        <br /><br />
                                        Além disso, você encontrará um <strong>Filtro de Estados</strong> interativo em nosso site, basta selecionar a região do Brasil de seu interesse na página de estatísticas!
                                    </p>
                                </div>
                            </div>
                        </section>

                        {/* seção "Funcionalidades" */}
                        <section className={styles.section}>
                        <div className={styles.titleContainer}>
                                <h2 className={styles.title}>
                                    <IconTitle
                                        variant="lineChart"
                                        size="large"
                                    />
                                    Funcionalidades
                                </h2>
                            </div>
                            <div className={styles.conteudoLinha}>
                                <div className={styles.textContainer}>
                                    <p className={styles.text}>
                                        Nosso site está repleto de funcionalidades que visam aprimorar a sua experiência e otimizar a sua análise da forma mais efetiva!
                                        <br /><br />
                                        Por exemplo, nosso <strong>Mapa de Principais Países</strong> oferece uma visão clara dos principais mercados fornecedores, ajudando empresas a tomar decisões estratégicas na importação de bens e insumos.
                                    </p>
                                </div>
                                <div className={styles.imagemLado}>
                                    <img src="src\assets\GIF\home2funcionalidades.gif" alt="Funcionalidades" className={styles.image} />
                                </div>
                            </div>
                        </section>

                        {/* seção "Estatísticas página" */}
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
