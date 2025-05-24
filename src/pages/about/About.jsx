import styles from './About.module.css'
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';


const About = () => {
    const location = useLocation();

    useEffect(() => {
        if (location.hash) {
            const element = document.getElementById(location.hash.replace('#', ''));
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
            }
        }
    }, [location]);

    return (
        <div className={styles.aboutContainer}>
            <header className={styles.header}>
                <div className={styles.imagesContainer}>
                    <img
                        src="src/assets/logos/LOGOSVG.svg"
                        alt="Logo PontoLog"
                        className={styles.logoOne}
                    />
                    <img
                        src="src/assets/logos/LOGO2SVG.svg"
                        alt="Logo PontoLog"
                        className={styles.logoTwo}
                    />
                </div>
            </header>

            <section className={styles.section}>
                <h1 className={styles.title}>Sobre o .Log</h1>
                <p className={styles.text}>
                    Nosso projeto nasce com a missão de oferecer uma plataforma intuitiva e acessível para acompanhar o desempenho dos Estados Brasileiros no comércio exterior. Utilizando dados abertos do Ministério do Desenvolvimento, Indústria, Comércio e Serviços, transformamos informações complexas em insights estratégicos. Com gráficos interativos e análises detalhadas, ajudamos tomadores de decisão a identificar tendências, visualizar oportunidades e compreender o cenário econômico de diferentes municípios, seja em crescimento, estagnação ou declínio no mercado internacional. Nosso compromisso é democratizar o acesso a informações relevantes, promovendo transparência e incentivando o desenvolvimento sustentável das regiões brasileiras. Com recursos personalizáveis, cada usuário pode adaptar a análise às suas necessidades, filtrando dados por produto, período, região ou tipo de comércio. Assim, contribuímos para um ambiente de negócios mais dinâmico e informado, onde decisões baseadas em dados impulsionam o crescimento econômico e a competitividade internacional.
                </p>
            </section>

            <section className={styles.section}>
                <h1 className={styles.title}>Nossa Equipe</h1>
                <div className={styles.sectionContent}>
                    <p className={styles.text}>
                        A Code Don't Blow é uma organização fundada por nove alunos da Fatec São José dos Campos, com o objetivo de desenvolver software e aplicações voltadas para o mercado de trabalho. Nosso time é composto por profissionais com habilidades diversas, focados em criar soluções inovadoras e eficientes.
                        Nossos valores incluem coragem, para tomar decisões ousadas; foco no cliente, ouvindo suas necessidades; inovação, buscando novas tecnologias; e colaboração trabalhando em equipe, valorizando diferentes perspectivas para alcançar melhores resultados.
                        Nossa equipe atua em diferentes frentes, desde o desenvolvimento e manutenção de produtos até o suporte ao cliente, garantindo uma experiência positiva para os usuários.
                    </p>
                    <img src="src\assets\logos\LogoCDB.svg" alt="Logo Equipe" className={styles.imageRight} />
                </div>
            </section>

            <section id="tratamento-dados" className={styles.section}>
                <h1 className={styles.title}>Tratamento de Dados</h1>
                <p className={styles.text}>Nosso compromisso é oferecer dados precisos e relevantes. Para isso, aplicamos um rigoroso processo de limpeza, removendo milhares de linhas com informações inválidas, duplicadas ou irrelevantes. Esse refinamento garante que apenas dados confiáveis sejam utilizados em nossas análises, permitindo que gestores e empresas tenham insights mais assertivos sobre o comércio exterior e o desempenho dos Estados Brasileiros no mercado internacional. Você pode ter maiores detalhes no link a seguir:
                </p><br />
                <a href="/pdfs/Tratamento de Dados.pdf" download="Tratamento de Dados.pdf" className={styles.link}>• PDF de Documentação sobre o Tratamento de Dados do “PontoLog”</a>
            </section>

            <section className={styles.section}>
                <div className={styles.sectionContent}>
                    <img src="src\assets\logos\LogoCOMEX.svg" alt="Logo Comex" className={styles.imageLeft} />
                    <p className={styles.text}>
                        Os dados utilizados em nossa plataforma são provenientes do Comex Stat, um sistema do Ministério do Desenvolvimento, Indústria, Comércio e Serviços que disponibiliza informações detalhadas sobre exportações e importações brasileiras. A partir desses dados abertos, processamos e transformamos grandes volumes de informação em visualizações intuitivas e análises estratégicas, permitindo uma compreensão clara do desempenho econômico dos Estados e municípios no comércio exterior. <br /> 
                        <a href="https://comexstat.mdic.gov.br/pt/home" className={styles.link}>• Link de navegação para o Site do Comex Stat</a>
                    </p>
                </div>
            </section>

            <section className={styles.section}>
                <h1 className={styles.title}>Venha conhecer nosso GitHub!</h1>
                <p className={styles.text}> Se você é apaixonado por tecnologia, inovação e colaboração, vai encontrar muito valor em acompanhar nosso trabalho. Quer saber mais sobre nosso projeto? Acesse nosso repositório no GitHub para explorar o código, acompanhar atualizações e contribuir com melhorias! Você também pode abrir issues, sugerir novas funcionalidades ou relatar bugs, sua participação é muito bem-vinda! Além disso, confira a Organização da equipe Code Don't Blow e descubra outros projetos inovadores que estamos desenvolvendo. Juntos, podemos construir soluções cada vez mais impactantes🚀
                </p> <br />
                <a href="https://github.com/CodeDontBlow/PontoLog" className={styles.link}>• Link Para o Github do PontoLog</a> <br /> <br />
                <a href="https://github.com/CodeDontBlow" className={styles.link}>• Link para o Github da Equipe Code Don’t Blow</a>
            </section>
        </div>
    );
};

export default About;