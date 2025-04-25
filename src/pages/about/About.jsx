import styles from './About.module.css'

const About = () => {
    return (
        <div className={styles.aboutContainer}>
            <header className={styles.header}>
                <img src="src\assets\logos\LOGO2SVG.svg" alt="Logo PontoLog" className={styles.logo} />
            </header>

            <section className={styles.section}>
                <h1 className={styles.title}>Sobre o .Log</h1>
                <p className={styles.text}>
                    Nosso projeto nasce com a missão de oferecer uma plataforma intuitiva e acessível para acompanhar o desempenho dos Estados Brasileiros no comércio exterior. Utilizando dados abertos do Ministério do Desenvolvimento, Indústria, Comércio e Serviços, transformamos informações complexas em insights estratégicos. Com gráficos interativos e análises detalhadas, ajudamos tomadores de decisão a identificar tendências, visualizar oportunidades e compreender o cenário econômico de diferentes municípios, seja em crescimento, estagnação ou declínio no mercado internacional.
                </p>
            </section>

            <section className={styles.section}>
                <h1 className={styles.title}>Nossa equipe</h1>
                <div className={styles.sectionContent}>
                    <p className={styles.text}>
                        A Code Don't Blow é uma organização fundada por nove alunos da Fatec São José dos Campos, com o objetivo de desenvolver software e aplicações voltadas para o mercado de trabalho. Nosso time é composto por profissionais com habilidades diversas, focados em criar soluções inovadoras e eficientes.
                        Nossos valores incluem coragem, para tomar decisões ousadas; foco no cliente, ouvindo suas necessidades; inovação, buscando novas tecnologias; e simplicidade, garantindo a melhor usabilidade.
                        Nossa equipe atua em diferentes frentes, desde o desenvolvimento e manutenção de produtos até o suporte ao cliente, garantindo uma experiência positiva para os usuários.
                    </p>
                    <img src="src\assets\logos\LogoCDB.svg" alt="Logo Equipe" className={styles.imageRight} />
                </div>
            </section>

            <section className={styles.section}>
                <h1 className={styles.title}>Dados utilizados</h1>
                <div className={styles.sectionContent}>
                    <img src="src\assets\logos\LogoCOMEX.svg" alt="Logo Comex" className={styles.imageLeft} />
                    <p className={styles.text}>
                        Os dados utilizados em nossa plataforma são provenientes do Comex Stat, um sistema do Ministério do Desenvolvimento, Indústria, Comércio e Serviços que disponibiliza informações detalhadas sobre exportações e importações brasileiras. A partir desses dados abertos, processamos e transformamos grandes volumes de informação em visualizações intuitivas e análises estratégicas, permitindo uma compreensão clara do desempenho econômico dos Estados e municípios no comércio exterior. <br />
                        <a href="https://comexstat.mdic.gov.br/pt/home" className={styles.link}>• Link de navegação para o site do Comex Stat</a>
                    </p>
                </div>
            </section>

            <section className={styles.section}>
                <h1 className={styles.title}>Tratamento de Dados</h1>
                <p className={styles.text}>Nosso compromisso é oferecer dados precisos e relevantes. Para isso, aplicamos um rigoroso processo de limpeza, removendo milhares de linhas com informações inválidas, duplicadas ou irrelevantes. Esse refinamento garante que apenas dados confiáveis sejam utilizados em nossas análises, permitindo que gestores e empresas tenham insights mais assertivos sobre o comércio exterior e o desempenho dos Estados Brasileiros no mercado internacional. Você pode ter maiores detalhes no link a seguir:
                </p><br />
                <a href="/pdfs/Tratamento de Dados.pdf" download="Tratamento de Dados.pdf" className={styles.link}>• PDF de Documentação sobre o Tratamento de Dados do “PontoLog”</a>
            </section>

            <section className={styles.section}>
                <h1 className={styles.title}>Venha conhecer nosso GitHub!</h1>
                <p className={styles.text}> Quer saber mais sobre nosso projeto? Acesse nosso repositório no GitHub para explorar o código, acompanhar atualizações e contribuir com melhorias! Além disso, confira o repositório da equipe Code Don't Blow e descubra outros projetos inovadores que estamos desenvolvendo. 🚀🔗
                </p> <br />
                <a href="https://github.com/CodeDontBlow/PontoLog" className={styles.link}>• Link Para o Github do PontoLog</a> <br /> <br />
                <a href="https://github.com/CodeDontBlow" className={styles.link}>• Link para o Github da Equipe Code Don’t Blow</a>
            </section>
        </div>
    );
};

export default About;