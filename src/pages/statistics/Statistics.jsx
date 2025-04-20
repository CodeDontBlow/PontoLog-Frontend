import styles from './Statistics.module.css'
import LineChart from '../../components/Charts/LineChart'
import BarChart from '../../components/Charts/BarChart'


const Statistics = () => {
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
                <div className={styles.component}>Componente Mapa do Brasil</div>
            </div>
            
            {/* Molde de Grid Vertical Reutilizável */}
            <section className={styles.infoGridVertical}>
                {/* Parte de Cima */}
                <section className={styles.topArea}>
                    <LineChart 
                    period={["Jan", "Fev", "Mar", "Abr", "Mai", "Jun" , "Jul", "Ago", "Set", "Out", "Nov", "Dez"]} 
                    values={[35, -12, 48, 5, -27, 60, 22, -40, 10, 55, -18, 30]}
                    dataName="Balança Comercial"
                    chartTitle="Balança Comercial"
                    colorPalette={["#D92B66"]}
                    />
                </section>

                {/* Parte de Baixo */}
                <section className={styles.bottomArea}>
                    {/* Item 1 */}
                    <div className={styles.component}>Componente Card Exp</div>
                    {/* Item 2 */}
                    <div className={styles.component}>Componente Card Imp</div>
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
                    <div className={styles.component}>Componente Mapa Mundi</div>
                </section>
                {/* Parte da Direita */}
                <section className={styles.rightArea}>
                    {/* Item 1 */}
                    <div className={styles.component}>Componente Gráfico Funil (Vias)</div>
                    {/* Item 2 */}
                    <div className={styles.component}>Componente Gráfico Funil (URFs)</div>
                </section>
            </section>

            {/* Molde de Grid Horizontal Reutilizável */}
            <section className={styles.infoGridHorizontal}>
                {/* Parte da Esquerda */}
                <section className={styles.leftArea}>
                    <div className={styles.component}>Componente Gráfico Linha (Valor Agregado)</div>
                </section>
                {/* Parte da Direita */}
                <section className={styles.rightArea}>
                    {/* Item 1 */}
                    <div className={styles.component}>Componente Gráfico Linha (kg_liquido)</div>
                    {/* Item 2 */}
                    <div className={styles.component}>Componente Gráfico Linha (vl_fob)</div>
                </section>
            </section>

            
        </section>

    </div>
  )
}

export default Statistics