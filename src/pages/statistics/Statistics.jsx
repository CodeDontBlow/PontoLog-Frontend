import styles from './Statistics.module.css'
import LineChart from '../../components/Charts/LineChart'
import BarChart from '../../components/Charts/BarChart'
import Card from '../../components/Cards/Card'
import BrazilMap from '../../components/Maps/BrazilMap'
import WorldMap from '../../components/Maps/WorldMap'

const Statistics = () => {
    
    const dadosTeste = {
      exportacao: [
        {
            country: "United States",
            quantidade: 8000,
            vl: 5000000,
            kg: 1500000,
        },
        {
            country: "China",
            quantidade: 6500,
            vl: 4800000,
            kg: 1400000,
        },
        {
            country: "Germany",
            quantidade: 4500,
            vl: 3000000,
            kg: 900000,
        },
        {
            country: "Spain",
            quantidade: 3000,
            vl: 2000000,
            kg: 800000,
        },
        {
            country: "Japan",
            quantidade: 4000,
            vl: 3500000,
            kg: 950000,
        },
        {
            country: "Brazil",
            quantidade: 3500,
            vl: 1800000,
            kg: 700000,
        },
        {
            country: "India",
            quantidade: 5000,
            vl: 2200000,
            kg: 850000,
        },
        {
            country: "France",
            quantidade: 3800,
            vl: 2800000,
            kg: 750000,
        },
        {
            country: "United Kingdom",
            quantidade: 4200,
            vl: 3200000,
            kg: 880000,
        },
        {
            country: "Italy",
            quantidade: 3200,
            vl: 2100000,
            kg: 650000,
        },
        {
            country: "Canada",
            quantidade: 2900,
            vl: 1900000,
            kg: 600000,
        },
        {
            country: "South Korea",
            quantidade: 3600,
            vl: 2400000,
            kg: 720000,
        },
        {
            country: "Mexico",
            quantidade: 2800,
            vl: 1500000,
            kg: 550000,
        },
        {
            country: "Australia",
            quantidade: 2500,
            vl: 1700000,
            kg: 500000,
        },
        {
            country: "Netherlands",
            quantidade: 2200,
            vl: 1600000,
            kg: 480000,
        },
        {
            country: "Russia",
            quantidade: 3000,
            vl: 2000000,
            kg: 750000,
        },
        {
            country: "Switzerland",
            quantidade: 1800,
            vl: 1400000,
            kg: 400000,
        },
        {
            country: "Turkey",
            quantidade: 2700,
            vl: 1300000,
            kg: 520000,
        },
        {
            country: "Saudi Arabia",
            quantidade: 2300,
            vl: 1200000,
            kg: 450000,
        },
        {
            country: "Argentina",
            quantidade: 2000,
            vl: 900000,
            kg: 380000,
        },
      ]
    };
    
    return (
    <div id={styles.statisticsPage}>

        {/* Área dos Inputs */}
        <section id={styles.inputArea}>
            {/* Input do Nome do Produto */}
            <div className={styles.productArea}>
                <div className={styles.component}> Input Produto </div>
                {/* Botões SH4 e SH6 */}
                <div className={styles.inputOptions}>
                    {/* SH4 */}
                    <input type="radio" name="sh-selection" id="sh4" defaultChecked/>
                    <label htmlFor="sh4"> SH4 </label>
                    
                    {/* SH6 */}
                    <input type="radio" name="sh-selection" id="sh6" />
                    <label htmlFor="sh6"> SH6 </label>
                </div>
            </div>

            {/* Input de Periodo de Tempo */}
            <div className={styles.periodArea}>
                {/* Inputs */}
                <div className={styles.periodInputs}>
                    {/* Primeiro Ano do Período */}
                    <div className={styles.firstYear}>
                        <div className={styles.component}> Input Ano 1 </div>
                    </div>

                    {/* Último Ano do Período */}
                    <div className={styles.lastYear}>
                        <div className={styles.component}> Input Ano 2 </div>
                    </div>
                </div>
                
                {/* Checkbox */}
                <div className={styles.inputOptions}>
                    <div className={styles.component}> Componente Checkbox </div>
                </div>
            </div>
        </section>

        {/* Alerta de quais Informações estão sendo exibidas */}
        <div className={styles.component}>Componente Alerta com Ícone</div>

        {/* Primeiras Informações da Página + mapa do brasil */}
        <section id={styles.primaryInfos}>
            {/* Mapa do Brasil */}
            <div className={styles.navMap}>
                <BrazilMap/>
            </div>
            
            {/* Molde de Grid Vertical Reutilizável */}
            <section className={styles.infoGridVertical}>
                {/* Parte de Cima */}
                <section className={styles.topArea}>
                    <div className={styles.component}>
                        <div className={styles.componentWrapper}>
                            <LineChart
                            period={["Jan", "Fev", "Mar", "Abr", "Mai", "Jun" , "Jul", "Ago", "Set", "Out", "Nov", "Dez"]}
                            values={[35, -12, 48, 5, -27, 100, 22, -40, 10, 55, -18, 30]}
                            chartTitle="Balança Comercial"
                            dataName="Balança Comercial"
                            colorPalette={["#D92B66"]}
                            />
                        </div>
                    </div>
                </section>

                {/* Parte de Baixo */}
                <section className={styles.bottomArea}>
                    {/* Item 1 */}
                    <Card title="Exportação" fatorAgregado="Muito manufaturado" produto="Grãos de Soja"/>
                    {/* Item 2 */}
                    <Card title="Importação" fatorAgregado="Pouco manufaturado" produto="Grãos de Arroz"/>
                </section>
            </section>
        </section>

        <div className={styles.component}> Componente Tab </div>

        {/* Informação completas de Exportação ou Importação */}
        <section id={styles.ExpImpInfos}>
            {/* Molde de Grid Horizontal Reutilizável */}
            <section className={styles.infoGridHorizontal}>
                {/* Parte da Esquerda */}
                <section className={styles.leftArea}>
                    <div className={styles.componentWrapper}>
                        <WorldMap
                        selectedRegion="Norte"
                        tradeType="exportacao"
                        countryDatas={dadosTeste}
                        />
                    </div>
                </section>
                {/* Parte da Direita */}
                <section className={styles.rightArea}>
                    {/* Item 1 */}
                    <div className={styles.componentWrapper}>
                        <BarChart
                        items={["Via Aquífera" , "Via Rodoviária" , "Via Aérea"]}
                        values={[512, 485, 271]}
                        chartTitle="Principais Vias"
                        colorPalette={["#D92B66"]}
                        />
                    </div>
                    {/* Item 2 */}
                    <div className={styles.componentWrapper}>
                        <BarChart
                        items={["Porto 123" , "Rodovia 123" , "Aeroporto 123"]}
                        values={[52, 45, 21]}
                        chartTitle="Principais URF's"
                        colorPalette={["#D92B66"]}
                        />
                    </div>
                </section>
            </section>

            {/* Molde de Grid Horizontal Reutilizável */}
            <section className={styles.infoGridHorizontal}>
                {/* Parte da Esquerda */}
                <section className={styles.leftArea}>
                    <div className={styles.componentWrapper}>
                        <LineChart
                        period={["Jan", "Fev", "Mar", "Abr", "Mai", "Jun" , "Jul", "Ago", "Set", "Out", "Nov", "Dez"]}
                        values={[35, -12, 48, 5, -27, 100, 22, -40, 10, 55, -18, 30]}
                        chartTitle="Valor Agregado"
                        dataName="Balança Comercial"
                        colorPalette={["#D92B66"]}
                        id="bottomInfo11"
                        group="bottomInfo1"
                        />
                    </div>
                </section>
                {/* Parte da Direita */}
                <section className={styles.rightArea}>
                    {/* Item 1 */}
                    <div className={styles.componentWrapper}>
                        <LineChart
                        period={["Jan", "Fev", "Mar", "Abr", "Mai", "Jun" , "Jul", "Ago", "Set", "Out", "Nov", "Dez"]}
                        values={[35, -12, 48, 5, -27, 100, 22, -40, 10, 55, -18, 30]}
                        chartTitle="Kl_liquido"
                        dataName="Balança Comercial"
                        colorPalette={["#D92B66"]}
                        id="bottomInfo12"
                        group="bottomInfo1"
                        />
                    </div>
                    {/* Item 2 */}
                    <div className={styles.componentWrapper}>
                        <LineChart
                        period={["Jan", "Fev", "Mar", "Abr", "Mai", "Jun" , "Jul", "Ago", "Set", "Out", "Nov", "Dez"]}
                        values={[35, -12, 48, 5, -27, 100, 22, -40, 10, 55, -18, 30]}
                        chartTitle="Vl_fob"
                        dataName="Balança Comercial"
                        colorPalette={["#D92B66"]}
                        id="bottomInfo13"
                        group="bottomInfo1"
                        />
                    </div>
                </section>
            </section>

            
        </section>

    </div>
  )
}

export default Statistics